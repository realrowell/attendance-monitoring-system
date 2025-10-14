<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EmpDetail;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeManagementController extends Controller
{
    public $request;
    public function __construct(Request $request){
        $this->request = $request;
    }
    public function CreateEmployee(){
        $data = $this->request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string',
            'dept_id' => 'required|string',
            'emp_class' => 'required|string',
            'is_active' => 'nullable|boolean'
        ]);

        $emp_detail = EmpDetail::create([
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'suffix' => $data['suffix']
        ]);
        $employee = Employee::create([
            'dept_id' => $data['dept_id'],
            'emp_class' => $data['emp_class'],
            'emp_details_id' => $emp_detail->id,
            'is_active' => $data['is_active']
        ]);
    }
}
