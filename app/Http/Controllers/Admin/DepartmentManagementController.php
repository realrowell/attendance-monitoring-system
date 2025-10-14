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
}
