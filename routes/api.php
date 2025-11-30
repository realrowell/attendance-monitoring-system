<?php

use App\Http\Controllers\Admin\ActivityAttendeeRegistrationManagementController;
use App\Http\Controllers\API\AttendanceApiController;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\EmployeeDependentApiController;
use App\Http\Controllers\API\ExportCsvEmployeesApiController;
use App\Http\Controllers\API\GetEmployeeListByNameApiController;
use App\Http\Controllers\API\ImportCsvEmpApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // Route::apiResource('/employee/details', EmployeeApiController::class);
    Route::post('/employee/details', [EmployeeApiController::class, 'fetch']);
    Route::get('/employee/getByName/{name}',  [GetEmployeeListByNameApiController::class, 'index']);
    Route::get('/attendances/getEmpDepdByActivity/{activityRef}', [EmployeeDependentApiController::class, 'show']);
    Route::get('/export/csv/employees', [ExportCsvEmployeesApiController::class, 'exportCsvEmployees']);
    Route::post('/import/csv/employees', [ImportCsvEmpApiController::class, 'importCsvEmployees']);
    Route::post('/import/csv/dependents', [ImportCsvEmpApiController::class, 'importCsvDependents']);
});
// Route::prefix('v1')->controller(GetEmployeeListByNameApiController::class)->group(function () {
//     Route::get('/employee/getByName/{name}', 'index');
// });

Route::prefix('v1')->group(function () {
    Route::apiResource('/attendance', AttendanceApiController::class);
    Route::post('/activity/register-attendee', [ActivityAttendeeRegistrationManagementController::class, 'RegisterAttendee']);
});
