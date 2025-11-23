<?php

namespace App\Actions\Activities;

use App\Models\Activity;
use App\Models\EmpActRegister;
use App\Models\Employee;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;
use \Illuminate\Database\Eloquent\ModelNotFoundException;

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
            'emp_id' => 'required|array',
            'emp_id.*' => 'string|exists:employees,public_id',
            'activity_ref' => 'required|string|exists:activities,ref',
        ]);

        $employeeIds = $validated_data['emp_id'];
        $employees = Employee::whereIn('public_id', $validated_data['emp_id'])
                                ->where('is_active', true)
                                ->get();
        $empActEmployees = EmpActRegister::whereIn('emp_id', $employees->pluck('id'))->get();
        $registeredIds = $empActEmployees->pluck('emp_id');

        if ($employees->count() !== count($employeeIds)) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'One or more Employees Not Found or inactive.',
            ]);
        }
        foreach($empActEmployees as $regEmp){
            $registeredEmployees[] = $regEmp->employees->empDetails->first_name." ".$regEmp->employees->empDetails->last_name;
        }
        $employees = $employees->reject(function ($employee) use ($registeredIds) {
            return $registeredIds->contains($employee->id);
        });

        try {
            $activity = Activity::where('ref', $validated_data['activity_ref'])->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw ValidationException::withMessages([
                'type' => 'error',
                'message' => 'Activity Not Found. The activity is deleted or deactivited.',
            ]);
        }

        DB::beginTransaction();

        try{
            //$i is started on 1 as the employees record now start at 1 and not 0; the $i-1 will compensate for the +1 at the beggining.
            for($i=0; count($employees) > $i; $i++){
                $attendee_registration = EmpActRegister::create([
                    'activity_id' => $activity->id,
                    'emp_id' => $employees[$i]->id,
                ]);
            }
            DB::commit();
            return [
                'type' => 'success',
                'message' => 'Attendance registered successfully for '.count($employees).' employees.'.(isset($registeredEmployees) ? ' The following employees were already registered: '.implode(", ", $registeredEmployees) : ''),
            ];
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
