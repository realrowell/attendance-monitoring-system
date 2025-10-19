<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dependent;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DependentManagementController extends Controller
{
    public $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function CreateDependent(){
        $data = $this->request->validate([
            'fullName' => 'required|string|max:255',
            'empId' => 'required|string|exists:employees,public_id',
            'isActive' => 'required|boolean',
            'depdType' => ['nullable',Rule::in(array_keys(Dependent::dependentTypeOptions()))]
        , [
            'depdType.in' => 'The selected dependent type is invalid.',
        ]]);

        $dependent = Dependent::create([
            'full_name' => $data['fullName'],
            'emp_id' => Employee::where('public_id', $data['empId'])->value('id'),
            'depd_type' => $data['depdType'],
            'is_active' => $data['isActive']
        ]);
    }
}
