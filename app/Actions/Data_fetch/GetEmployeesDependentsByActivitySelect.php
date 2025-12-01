<?php

namespace App\Actions\Data_fetch;

use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
use App\Models\EmpActRegister;
use Illuminate\Validation\ValidationException;

class GetEmployeesDependentsByActivitySelect
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected $activityRef)
    {
        //
    }

    public function execute(){
        // $activity = Activity::where('ref', $this->activityRef)->where('activity_status', 'published')->first();
        // if(!$activity){
        //     throw ValidationException::withMessages([
        //             'type' => 'info',
        //             'message' => 'Activity not found or unpublished.',
        //         ]);
        // }
        try {
            $activity = Activity::where('ref', $this->activityRef)
                                ->where('activity_status', 'published')
                                ->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Activity not found or unpublished.',
            ]);
            // return response()->json([
            //     'status' => 'error',
            //     'message' => 'Activity not found or unpublished.'
            // ], 404);
        }

        // $attendances = Attendance::where('activity_id',$activity->id)->get();
        $att_employees = AttEmployee::whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                            ->with(['attendances', 'employees.empDetails', 'employees.departments'])->get();
        $att_dependents = AttDependent::whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                            ->with(['attendances', 'dependents'])->get();
        $registered_count = EmpActRegister::where('activity_id', $activity->id)->count();
        $data = [
            // 'attendances' => $attendances,
            'att_employees' => $att_employees,
            'att_dependents' => $att_dependents,
            'registered_count' => $registered_count,
        ];

        return $data;
    }
}
