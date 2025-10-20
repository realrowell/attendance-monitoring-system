<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
use App\Models\Dependent;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendeeManagementController extends Controller
{
    public $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function CreateAttendee(){
        $data = $this->request->validate([
            'activity_id' => 'required|string|exists:activities,ref',
            'emp_id' => 'required|string|exists:employees,public_id',
            'emp_is_present' => 'nullable|boolean',
            'part_type' => 'required|string',
            'dependents.*' => 'nullable|array',
            'dependents.*.depd_id' => 'required|string',
            'dependents.*.depd_is_present' => 'required|boolean',
        ]);

        $employee = Employee::where('public_id', $data['emp_id'])->first();
        $activity = Activity::where('ref', $data['activity_id'])->first();

        // dd($data['dependents'] ?? null);

        $attendance = Attendance::create([
            'activity_id' => $activity->id,
            'date_time' => Carbon::now(),
            'mop' => $data['part_type']
        ]);
        $att_employee = AttEmployee::create([
            'att_id' => $attendance->id,
            'emp_id' => $employee->id,
            'is_present' => $data['emp_is_present'] ?? false,
        ]);
        if($data['dependents'] ?? null != null){
            for($i=0; $i < count($data['dependents']); $i++){
                $dependent[$i] = Dependent::where('public_id', $data['dependents'][$i]['depd_id'])->first();
                $att_dependent = AttDependent::create([
                    'att_id' => $attendance->id,
                    'depd_id' => $dependent[$i]->id,
                    'is_present' => $data['dependents'][$i]['depd_is_present'] ?? false,
                ]);
            }
        }
    }
}
