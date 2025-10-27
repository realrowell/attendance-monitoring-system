<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
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
        $employee = Employee::where('public_id', $empId)->with(['empDetails','departments'])->first();
        $data = [
            'suffixes' => EmpDetail::suffixOptions(),
            'empClasses' => Employee::empClassOptions(),
            'departments' => Department::get(),
            'dependentTypes' => Dependent::dependentTypeOptions(),
            'dependents' => Dependent::where('emp_id',$employee->id)->where('is_active', true)->get(),
            'employee' => $employee,
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

    public function ActivityDetailsPage($ref){
        $activity = Activity::where('ref', $ref)->first();

        $data = [
            'activity' => $activity,
            'activityStatusOptions' => Activity::activityStatusOptions(),
            'activityTypeOptions' => Activity::participationTypeOptions(),
            'partTypeOptions' => Attendance::mopOptions(),
            'attendances' => Attendance::where('activity_id', $activity->id)
                                        ->with([
                                                'attEmployees.employees.empDetails',
                                                'attEmployees.employees.departments',
                                                'attDependents.dependents',
                                            ])
                                        ->get(),
            'suffixes' => EmpDetail::suffixOptions(),
            'empClasses' => Employee::empClassOptions(),
            'attDependents' => AttDependent::whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                                            ->with(['attendances','dependents'])->get(),
            'attEmployees' => AttEmployee::whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                                            ->with(['attendances','employees.empDetails','employees.departments'])->get(),
        ];
        return Inertia::render('admin/activities/activity-details', $data);
    }

    public function AttendanceListPage(){
        $data = [
            'attendances' => Attendance::get(),
            'partTypeOptions' => Attendance::mopOptions(),
            'attEmployees' => AttEmployee::get(),
            'attDependents' => AttDependent::get(),
        ];
        return Inertia::render('admin/attendances/attendance-list', $data);
    }
}
