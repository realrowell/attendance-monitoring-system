<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AttEmployee;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;

class ExportCsvEmployeesApiController extends Controller
{

    public function exportCsvEmployees()
    {
        // Define the HTTP headers for the CSV download
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="employee_export_' . Carbon::now() . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        // Define the column headings for the CSV file
        $columns = ['id', 'emp_no.', 'name', 'department', 'classification', 'qr_string_data'];

        // Define the callback function that generates the CSV content chunk by chunk
        $callback = function () use ($columns) {
            // Send UTF-8 BOM so Excel reads characters correctly
            echo "\xEF\xBB\xBF";
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
                        'emp_no' => $employee->emp_no,
                        'name' => $employee->empDetails->first_name . " " . $middleInitial . $employee->empDetails->last_name,
                        'department' => $employee->departments->dept_name,
                        'classification' => $employee->emp_class,
                    ], JSON_UNESCAPED_UNICODE);
                    // Format the user data as an array for fputcsv()
                    $row = [
                        $employee->public_id,
                        $employee->emp_no,
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


    public function exportAttendanceCsv($refActivity)
    {
        $activity = Activity::where('ref', $refActivity)->firstOrFail();

        // Define the HTTP headers for the CSV download
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="attendance_export_' . Carbon::now() . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        // Define the column headings for the CSV file
        $columns = ['Name', 'Grand Raffle Entry', 'Date Time'];

        // Define the callback function that generates the CSV content chunk by chunk
        $callback = function () use ($columns, $activity) {
            // Send UTF-8 BOM so Excel reads characters correctly
            echo "\xEF\xBB\xBF";
            $file = fopen('php://output', 'w'); // Open the output stream

            // Write the column headers to the CSV file
            fputcsv($file, $columns);

            // Fetch data efficiently in chunks to manage memory
            AttEmployee::whereHas('attendances', function ($q) use ($activity) {
                $q->where('activity_id', $activity->id);
            })
                ->with(['attendances' => function ($q) use ($activity) {
                    $q->where('activity_id', $activity->id);
                }])
                ->chunk(2000, function ($att_employees) use ($file) {
                    foreach ($att_employees as $att_employee) {
                        // Format the user data as an array for fputcsv()
                        $attendance = $att_employee->attendances->first();
                        $row = [
                            $att_employee->full_name,
                            $att_employee->attendances->is_raffle ? 'Yes' : 'No',
                            $att_employee->attendances->created_at,
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
