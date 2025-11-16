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
    public function importCsvEmployees(Request $request){
        // Validate file
        $request->validate([
            'file' => 'required|mimes:csv,txt',
        ]);

        // $path = $request->file('file')->getRealPath();

        // // Open file
        // $file = fopen($path, 'r');

        // // Skip header row
        // $header = fgetcsv($file);

        Log::info($request);
        $uploadedFile = $request->file('file');

        if (!$uploadedFile || !$uploadedFile->isValid()) {
            return response()->json(['success' => false, 'message' => 'Invalid file upload'], 400);
        }

        // Open file safely
        $file = fopen($uploadedFile->getRealPath(), 'r');

        if (!$file) {
            return response()->json(['success' => false, 'message' => 'Cannot open file'], 500);
        }

        // Skip header
        $header = fgetcsv($file);

        DB::beginTransaction();

        try {
            while (($row = fgetcsv($file)) !== false) {

                $emp_no         = $row[0];
                $first_name     = $row[1];
                $middle_name    = $row[2];
                $last_name      = $row[3];
                $department     = $row[4];
                $emp_class      = $row[5];

                // Find or create department
                $dept = Department::firstOrCreate([
                    'dept_name' => $department
                ]);

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

                if ($employee) {
                    // UPDATE
                    $employee->update([
                        'emp_no' => $emp_no,
                        'emp_class' => $emp_class,
                        'dept_id' => $dept->id,
                    ]);

                    $employee->empDetails->update([
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'middle_name' => $middle_name,
                    ]);

                } else {
                    // CREATE
                    $employee = Employee::create([
                        'emp_no' => $emp_no,
                        'emp_class' => $emp_class,
                        'dept_id' => $dept->id,
                    ]);

                    $employee->empDetails()->create([
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'middle_name' => $middle_name,
                    ]);
                }
            }

            DB::commit();
            fclose($file);

            return back()->with('success', 'Employees imported successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            fclose($file);

            return back()->with('error', 'Import failed: ' . $e->getMessage());
        }
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
                       'name' => $employee->empDetails->first_name . " " .$middleInitial. $employee->empDetails->last_name,
                       'department' => $employee->departments->dept_name
                    ]);
                    // Format the user data as an array for fputcsv()
                    $row = [
                        $employee->public_id,
                        $employee->empDetails->first_name . " " .$middleInitial. $employee->empDetails->last_name,
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
