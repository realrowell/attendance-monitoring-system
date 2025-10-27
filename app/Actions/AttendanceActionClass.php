<?php

namespace App\Actions;

use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
use App\Models\Dependent;
use App\Models\Employee;
use Carbon\Carbon;

class AttendanceActionClass
{
    public $data;
    /**
     * Create a new class instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function CreateAttendanceRecord(){
        $validated_data = $this->data->validate([
            'activity_id' => 'required|string|exists:activities,ref',
            'emp_id' => 'required|string|exists:employees,public_id',
            'emp_is_present' => 'nullable|boolean',
            'part_type' => 'required|string',
            'dependents.*' => 'nullable|array',
            'dependents.*.depd_id' => 'required|string',
            'dependents.*.depd_is_present' => 'required|boolean',
        ]);

        $employee = Employee::where('public_id', $validated_data['emp_id'])->first();
        $activity = Activity::where('ref', $validated_data['activity_id'])->first();

        // dd($employee ?? null);

        $attendance = Attendance::create([
            'activity_id' => $activity->id,
            'date_time' => Carbon::now(),
            'mop' => $validated_data['part_type']
        ]);
        $att_employee = AttEmployee::create([
            'att_id' => $attendance->id,
            'emp_id' => $employee->id,
            'is_present' => $validated_data['emp_is_present'] ?? false,
        ]);
        if($validated_data['dependents'] ?? null != null){
            for($i=0; $i < count($validated_data['dependents']); $i++){
                $dependent[$i] = Dependent::where('public_id', $validated_data['dependents'][$i]['depd_id'])->first();
                $att_dependent = AttDependent::create([
                    'att_id' => $attendance->id,
                    'depd_id' => $dependent[$i]->id,
                    'is_present' => $validated_data['dependents'][$i]['depd_is_present'] ?? false,
                ]);
            }
        }
    }
}
