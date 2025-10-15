<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentManagementController extends Controller
{
    public $request;
    public function __construct(Request $request){
        $this->request = $request;
    }

    public function CreateDepartment(){
        $data = $this->request->validate([
            'deptName' => 'required|string|max:255'
        ]);

        $department = Department::create([
            'dept_name' => $data['deptName'],
        ]);

        // return redirect()->back()->with(['success'=>'successfully']);
    }

    public function UpdateDepartment(){
        $data = $this->request->validate([
            'deptId' => 'required|string|exists:departments,public_id',
            'dept_name' => 'required|string|max:255'
        ], [
            'deptId.exists' => 'The selected department is invalid or does not exist.',
        ]);

        $department = Department::where('public_id', $data['deptId'])->update([
            'dept_name' => $data['dept_name']
        ]);
    }
}
