<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Department;
use App\Models\Dependent;
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
            'employees' => Employee::with(['empDetails','departments'])->get(),
        ];
        return Inertia::render('admin/employees/employee-list', $data);
    }

    public function EmployeeDetailsPage($empId){
        $data = [
            'suffixes' => EmpDetail::suffixOptions(),
            'empClasses' => Employee::empClassOptions(),
            'departments' => Department::get(),
            'dependentTypes' => Dependent::dependentTypeOptions(),
            'dependents' => Dependent::where('is_active', true)->get(),
            'employee' => Employee::where('public_id', $empId)->with(['empDetails','departments'])->first(),
        ];

        return Inertia::render('admin/employees/employee-details')->with($data);
    }

    public function DepartmentListPage(){
        $data = [
            'departments' => Department::get(),
        ];
        return Inertia::render('admin/departments/department-list', $data);
    }

    public function ActivityListPage(){
        $data = [
            'activities' => Activity::get(),
            'activityStatusOptions' => Activity::activityStatusOptions(),
            'activityTypeOptions' => Activity::participationTypeOptions(),
        ];
        return Inertia::render('admin/activities/activity-list', $data);
    }
}
