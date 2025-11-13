<?php

namespace App\Actions\Activities;

use App\Models\Activity;
use App\Models\EmpActRegister;
use App\Models\Employee;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class ActivityAttendeeRegistrationAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected $data)
    {
        //
    }

    public function execute(){
        $validated_data = $this->data->validate([
            'emp_id' => 'required|string|exists:employees,public_id',
            'activity_ref' => 'required|string|exists:activities,ref',
        ]);


        try {
           $employee = Employee::where('public_id', $validated_data['emp_id'])->where('is_active', true)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Employee Not Found. The employee is deleted or deactivited.',
            ]);
        }
        try {
            $activity = Activity::where('ref', $validated_data['activity_ref'])->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Activity Not Found. The activity is deleted or deactivited.',
            ]);
        }

        DB::beginTransaction();

        try{
            $attendee_registration = EmpActRegister::create([
                'activity_id' => $activity->id,
                'emp_id' => $employee->id,
            ]);
            DB::commit();
        }
        catch(ValidationException $e){
            DB::rollBack();
            throw $e;
        }
        catch (Exception $e) {
            // Rollback and throw a user-friendly validation-style error
            DB::rollBack();

            // Log the error for debugging purposes
            Log::error('Attendance creation failed', [
                'error' => $e->getMessage(),
                'data' => $this->data,
            ]);

            throw ValidationException::withMessages([
                'general' => app()->environment('local')
                    ? $e->getMessage()
                    : 'Something went wrong while saving attendance. Please try again later.',
            ]);
        }
    }
}
