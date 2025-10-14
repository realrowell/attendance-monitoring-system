<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\EmpDetail;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPageController extends Controller
{
    public function EmployeeListPage(){
        $data = [
            'suffixes' => EmpDetail::suffixOptions(),
            'empClasses' => Employee::empClassOptions(),
            'departments' => Department::get(),
        ];
        return Inertia::render('admin/employees/employee-list', $data);
    }

    public function DepartmentListPage(){
        $data = [
            'departments' => Department::get(),
        ];
        return Inertia::render('admin/departments/department-list', $data);
    }
}
