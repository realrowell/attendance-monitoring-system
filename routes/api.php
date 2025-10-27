<?php

use App\Http\Controllers\API\AttendanceApiController;
use App\Http\Controllers\API\EmployeeApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::apiResource('/employee/details', EmployeeApiController::class);
});

Route::prefix('v1')->group(function () {
    Route::apiResource('/attendance', AttendanceApiController::class);
});
