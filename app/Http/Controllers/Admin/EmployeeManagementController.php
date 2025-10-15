<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
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
            'fname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'lname' => 'required|string|max:255',
            'suffix' => 'nullable|string',
            'deptId' => 'required|string',
            'empClass' => 'required|string',
            'isActive' => 'nullable|boolean'
        ]);
        if($data['suffix'] == 'null'){
            $data['suffix'] = null;
        }

        $dept = Department::where('public_id',$data['deptId'])->first();

        $emp_detail = EmpDetail::create([
            'last_name' => $data['lname'],
            'first_name' => $data['fname'],
            'middle_name' => $data['mname'],
            'suffix' => $data['suffix']
        ]);
        $employee = Employee::create([
            'dept_id' => $dept->id,
            'emp_class' => $data['empClass'],
            'emp_details_id' => $emp_detail->id,
            'is_active' => $data['isActive']
        ]);
    }
}
