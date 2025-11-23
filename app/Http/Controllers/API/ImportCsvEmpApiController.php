<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Dependent;
use App\Models\EmpDetail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Employee;

class ImportCsvEmpApiController extends Controller
{
    public function importCsvEmployees(Request $request)
    {
        $file = $request->file('file');
        $path = $file->getPathname();

        $handle = fopen($path, "r");
        if (!$handle) {
            return back()->with('error', 'Unable to open CSV file.');
        }

        // Remove BOM from the first line (if present)
        $firstLine = fgets($handle);
        $firstLine = preg_replace('/^\xEF\xBB\xBF/', '', $firstLine);

        // Assume first line is header
        $header = str_getcsv($firstLine);

        DB::beginTransaction();

        try {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {

                // Skip empty rows
                if (empty(array_filter($data))) continue;

                // Skip malformed rows
                if (count($data) < 6) continue;

                // Log::info('CSV row read', $data);
                // Extract CSV columns
                $emp_no      = trim($data[0]);
                $first_name  = trim($data[1]);
                $middle_name = trim($data[2]);
                $last_name   = trim($data[3]);
                $department  = trim($data[4]);
                $emp_class   = trim($data[5]);
                // Log::info('CSV row read' . $emp_no . $first_name . $middle_name . $last_name . $department . $emp_class);

                // Validate required
                if (!$emp_no || !$first_name || !$last_name) {
                    continue; // You can also log invalid rows
                }

                // Find or create department
                $dept = Department::firstOrCreate([
                    'dept_name' => $department
                ]);

                // Find employee (by emp_no or name)
                $employee = Employee::where('emp_no', $emp_no)
                    ->orWhereHas('empDetails', function ($q) use ($first_name, $last_name) {
                        $q->where(function ($q2) use ($first_name, $last_name) {
                            if ($first_name) {
                                $q2->where('first_name', 'LIKE', "%$first_name%");
                            }
                            if ($last_name) {
                                $q2->where('last_name', 'LIKE', "%$last_name%");
                            }
                        });
                    })
                    ->first();
                Log::info('employee from db' . $employee);

                if ($employee) {
                    // UPDATE
                    $employee->update([
                        'emp_no' => $emp_no,
                        'emp_class' => $emp_class,
                        'dept_id' => $dept->id,
                    ]);

                    $empDetails = EmpDetail::where('id', $employee->emp_details_id)->update([
                        'first_name' => $first_name,
                        'middle_name' => $middle_name,
                        'last_name' => $last_name,
                    ]);
                    Log::info('Successfully updated Employee');
                } else {
                    // CREATE
                    $empDetails = EmpDetail::create([
                        'first_name' => $first_name,
                        'middle_name' => $middle_name,
                        'last_name' => $last_name,
                    ]);
                    $employee = Employee::create([
                        'emp_no' => $emp_no,
                        'emp_class' => $emp_class,
                        'dept_id' => $dept->id,
                        'emp_details_id' => $empDetails->id,
                        'is_active' => true,
                    ]);
                    Log::info('Successfully created Employee');
                }
                // Your DB create/update logic here
            }

            fclose($handle);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($handle)) fclose($handle);

            return back()->with('error', 'Import failed: ' . $e->getMessage());
        }
    }


    public function importCsvDependents(Request $request){
        $file = $request->file('file');
        $path = $file->getPathname();

        $handle = fopen($path, "r");
        if (!$handle) {
            return back()->with('error', 'Unable to open CSV file.');
        }

        // Remove BOM from the first line (if present)
        $firstLine = fgets($handle);
        $firstLine = preg_replace('/^\xEF\xBB\xBF/', '', $firstLine);

        // Assume first line is header
        $header = str_getcsv($firstLine);

        DB::beginTransaction();

        try {
            while (($data = fgetcsv($handle, 1000, ",")) !== false) {

                // Skip empty rows
                if (empty(array_filter($data))) continue;

                // Skip malformed rows
                if (count($data) < 3) continue;

                // Extract CSV columns
                $emp_no      = trim($data[0]);
                $full_name   = trim($data[1]);
                $depd_type   = trim($data[2]);
                // Log::info('CSV row read' . $emp_no . $first_name . $middle_name . $last_name . $department . $emp_class);

                // Validate required
                if (!$emp_no || !$full_name || !$depd_type) {
                    Log::info('Invalid row ' . $emp_no." | ".$full_name." | ".$depd_type);
                    continue; // You can also log invalid rows
                }

                // Find or create department
                // $dept = Department::firstOrCreate([
                //     'dept_name' => $department
                // ]);

                // Find employee (by emp_no or name)
                $employee = Employee::where('emp_no', $emp_no)->first();
                if (!$employee) {
                    Log::info('Invalid row, no employee found ' . $emp_no." | ".$full_name." | ".$depd_type);
                    continue; // You can also log invalid rows
                }
                $dependents = Dependent::where('emp_id',$employee->id)->get();
                Log::info('dependents: ' . $dependents);

                if(count($dependents) > 0){
                    Log::info('dependents if loop: ');
                    for($i=0; $i < count($dependents); $i++){
                        if($dependents->where('full_name',$full_name)->first()){
                            Log::info('Dependent is already exist');
                            continue 2;
                        }
                    }
                }
                Log::info('dependents out loop: ' . $dependents);
                    $dependent = Dependent::create([
                        'emp_id' => $employee->id,
                        'full_name' => $full_name,
                        'depd_type' => $depd_type,
                        'is_active' => true,
                    ]);
            }

            fclose($handle);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($handle)) fclose($handle);

            return back()->with('error', 'Import failed: ' . $e->getMessage());
        }
    }
}
