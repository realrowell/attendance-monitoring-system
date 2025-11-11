<?php

namespace App\Actions\Data_fetch;

use App\Models\Activity;
use App\Models\Attendance;
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

        $attendances = Attendance::where('activity_id',$activity->id)
                                    ->with([
                                        'attEmployees.employees.empDetails',
                                        'attEmployees.employees.departments',
                                        'attDependents.dependents',
                                    ])
                                    ->orderBy('created_at','asc')
                                    ->get();
        return $attendances;
    }
}
