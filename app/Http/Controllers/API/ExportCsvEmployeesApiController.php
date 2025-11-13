<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ExportCsvEmployeesApiController extends Controller
{
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
