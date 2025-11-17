<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\EmpDetail;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ExportCsvEmployeesApiController extends Controller
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
                    ]);
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


        // DB::beginTransaction();

        // try {
        //     $handle = fopen($path, "r");

        //     if (!$handle) {
        //         return back()->with('error', 'Unable to open CSV file.');
        //     }

        //     $headerSkipped = false;
        //     $firstLine = fgets($handle);
        //     $firstLine = preg_replace('/^\xEF\xBB\xBF/', '', $firstLine); // remove BOM
        //     $data = str_getcsv($firstLine);
        //     while (($data = fgetcsv($handle, 1000, ",")) !== false) { // skip empty lines
        //         if (empty(array_filter($data))) {
        //             continue;
        //         }

        //         Log::info('CSV row read', $data); // confirm reading
        //         // Skip empty or malformed rows
        //         if (!$data || count($data) < 6) {
        //             continue;
        //         }

        //         // Skip header row once
        //         if (!$headerSkipped) {
        //             $headerSkipped = true;
        //             continue;
        //         }

        //         // Extract CSV columns
        //         $emp_no      = trim($data[0]);
        //         $first_name  = trim($data[1]);
        //         $middle_name = trim($data[2]);
        //         $last_name   = trim($data[3]);
        //         $department  = trim($data[4]);
        //         $emp_class   = trim($data[5]);

        //         // Validate required
        //         if (!$emp_no || !$first_name || !$last_name) {
        //             continue; // You can also log invalid rows
        //         }

        //         // Find or create department
        //         $dept = Department::firstOrCreate([
        //             'dept_name' => $department
        //         ]);

        //         // Find employee (by emp_no or name)
        //         $employee = Employee::where('emp_no', $emp_no)
        //             ->orWhereHas('empDetails', function ($q) use ($first_name, $last_name) {
        //                 $q->where(function ($q2) use ($first_name, $last_name) {
        //                     if ($first_name) {
        //                         $q2->where('first_name', 'LIKE', "%$first_name%");
        //                     }
        //                     if ($last_name) {
        //                         $q2->where('last_name', 'LIKE', "%$last_name%");
        //                     }
        //                 });
        //             })
        //             ->first();

        //         if ($employee) {
        //             // UPDATE
        //             $employee->update([
        //                 'emp_no' => $emp_no,
        //                 'emp_class' => $emp_class,
        //                 'dept_id' => $dept->id,
        //             ]);

        //             // Ensure empDetails exists
        //             if ($employee->empDetails) {
        //                 $employee->empDetails->update([
        //                     'first_name' => $first_name,
        //                     'middle_name' => $middle_name,
        //                     'last_name' => $last_name,
        //                 ]);
        //             } else {
        //                 $employee->empDetails()->create([
        //                     'first_name' => $first_name,
        //                     'middle_name' => $middle_name,
        //                     'last_name' => $last_name,
        //                 ]);
        //             }
        //         } else {
        //             // CREATE
        //             $employee = Employee::create([
        //                 'emp_no' => $emp_no,
        //                 'emp_class' => $emp_class,
        //                 'dept_id' => $dept->id,
        //             ]);

        //             $employee->empDetails()->create([
        //                 'first_name' => $first_name,
        //                 'middle_name' => $middle_name,
        //                 'last_name' => $last_name,
        //             ]);
        //         }
        //     }

        //     fclose($handle);
        //     Log::info('Before DB commit');
        //     DB::commit();
        //     Log::info('After DB commit');

        //     return back()->with('success', 'Employees imported successfully.');
        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     if (isset($handle)) fclose($handle);

        //     return back()->with('error', 'Import failed: ' . $e->getMessage());
        // }
    }


    public function exportCsvEmployees()
    {
        // Define the HTTP headers for the CSV download
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="employee_export_core_php.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        // Define the column headings for the CSV file
        $columns = ['ID', 'Name', 'Departments', 'Classification', 'QR String Data'];

        // Define the callback function that generates the CSV content chunk by chunk
        $callback = function () use ($columns) {
            $file = fopen('php://output', 'w'); // Open the output stream

            // Write the column headers to the CSV file
            fputcsv($file, $columns);

            // Fetch data efficiently in chunks to manage memory
            Employee::chunk(2000, function ($employees) use ($file) {
                foreach ($employees as $employee) {
                    $middleInitial = '';
                    if ($employee->empDetails->middle_name) {
                        $middleInitial = strtoupper($employee->empDetails->middle_name[0]) . '. '; // Get initial and maybe add a period
                    }
                    $qr_data_string = json_encode([
                        'id' => $employee->public_id,
                        'name' => $employee->empDetails->first_name . " " . $middleInitial . $employee->empDetails->last_name,
                        'department' => $employee->departments->dept_name
                    ]);
                    // Format the user data as an array for fputcsv()
                    $row = [
                        $employee->public_id,
                        $employee->empDetails->first_name . " " . $middleInitial . $employee->empDetails->last_name,
                        $employee->departments->dept_name,
                        $employee->emp_class,
                        $qr_data_string
                    ];

                    // Write the data row to the CSV file
                    fputcsv($file, $row);
                }
            });

            fclose($file); // Close the output stream
        };

        // Return a StreamedResponse which handles the download
        return Response::stream($callback, 200, $headers);
    }
}
