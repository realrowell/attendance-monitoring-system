<?php

namespace App\Actions\Attendances;

use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
use App\Models\Dependent;
use App\Models\EmpActRegister;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateAttendanceRecordAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected $data)
    {
        //
    }

    public function execute()
    {
        $validated_data = $this->data->validate([
            'activity_id' => 'required|string|exists:activities,ref',
            'emp_id' => 'required|string|exists:employees,public_id',
            'emp_no' => 'required|string|exists:employees,emp_no',
            'emp_is_present' => 'nullable|boolean',
            'part_type' => 'required|string',
            'dependents' => 'nullable|array',
            'dependents.*.depd_id' => 'required|string',
            'dependents.*.depd_is_present' => 'required|boolean',
        ]);

        $employee = Employee::where('public_id', $validated_data['emp_id'])->first();
        $activity = Activity::where('ref', $validated_data['activity_id'])->first();

        $isRegistered = EmpActRegister::where('emp_id', $employee->id)
            ->where('activity_id', $activity->id)
            ->exists();

        if (!$isRegistered) {
            throw ValidationException::withMessages([
                'general' => 'Employee is not registered for this activity.',
            ]);
        }

        // dd($employee ?? null);


        DB::beginTransaction();

        try {
            // 🧩 1. Create main attendance
            $attendance = Attendance::create([
                'activity_id' => $activity->id,
                'date_time' => Carbon::now(),
                'mop' => $validated_data['part_type']
            ]);

            $skippedDependents = [];
            // 🧩 3. Create dependents if any
            if (!empty($validated_data['dependents'])) {
                foreach ($validated_data['dependents'] as $dep) {

                    // Skip if not present
                    if (empty($dep['depd_is_present'])) {
                        continue;
                    }

                    $dependent = Dependent::where('public_id', $dep['depd_id'])->first();
                    if (!$dependent) continue;

                    // Check if already recorded
                    $existingDepd = AttDependent::where('depd_id', $dependent->id)
                        ->whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                        ->with('dependents')
                        ->first();

                    if ($existingDepd) {
                        $skippedDependents[] = $existingDepd->dependents->full_name ?? 'Unknown Dependent';
                        continue;
                    }

                    AttDependent::create([
                        'att_id' => $attendance->id,
                        'depd_id' => $dependent->id,
                        'is_present' => $dep['depd_is_present'],
                        'full_name' => $dependent?->full_name ?? 'N/A',
                        'relation' => $dependent?->depd_type ?? 'N/A',
                    ]);
                }
            }

            if ($validated_data['emp_is_present'] == true || $validated_data['emp_is_present'] != null) {
                // ✅ Check if employee already has an attendance record
                $existingEmp = AttEmployee::where('emp_id', $employee->id)
                    ->whereHas('attendances', fn($q) => $q->where('activity_id', $activity->id))
                    ->first();

                if ($existingEmp) {
                    // ❌ Throw a validation error back to frontend
                    throw ValidationException::withMessages([
                        'type' => 'info',
                        'message' => 'Employee already has an attendance record.'
                    ]);
                }

                $empFullName = $employee->empDetails->first_name . ' ' . $employee->empDetails->middle_name . ' ' . $employee->empDetails->last_name;
                // 🧩 2. Create attendance employee record
                $att_employee = AttEmployee::create([
                    'att_id' => $attendance->id,
                    'emp_id' => $employee->id,
                    'is_present' => $validated_data['emp_is_present'] ?? false,
                    'full_name' => $empFullName ?? 'N/A',
                    'emp_class' => $employee?->emp_class ?? 'N/A',
                    'department' => $employee->departments?->dept_name ?? 'N/A',
                ]);
            }

            DB::commit();

            if (count($skippedDependents) > 0) {
                $StrDependents = implode(', ', $skippedDependents);

                throw ValidationException::withMessages([
                    'type' => 'info',
                    'message' => $StrDependents . ' already has an attendance record.',
                ]);
            }

            return $attendance;
        } catch (ValidationException $e) {
            // Rollback and rethrow validation errors
            DB::rollBack();
            throw $e;
        } catch (Exception $e) {
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
