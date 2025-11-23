<?php

use App\Http\Controllers\Admin\ActivityManagementController;
use App\Http\Controllers\Admin\ActivityRegisterEmployeeManagementController;
use App\Http\Controllers\Admin\AdminPageController;
use App\Http\Controllers\Admin\AttendeeManagementController;
use App\Http\Controllers\Admin\DepartmentManagementController;
use App\Http\Controllers\Admin\DependentManagementController;
use App\Http\Controllers\Admin\EmployeeManagementController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware(['auth', 'verified'])->controller(AdminPageController::class)->group(function () {
    Route::get('/employees/emp-list', 'EmployeeListPage')->name('employees.list');
    Route::get('/employees/emp-details/{id}', 'EmployeeDetailsPage')->name('employee.details');
    Route::get('/departments/dept-list', 'DepartmentListPage')->name('departments.list');
    Route::get('/activities/activity-list', 'ActivityListPage')->name('activities.list');
    Route::get('/activities/activity-details/{ref}', 'ActivityDetailsPage')->name('activity.details');
    Route::get('/attendances/attendance-list', 'AttendanceListPage')->name('attendances.list');
});

Route::middleware(['auth', 'verified'])->controller(DepartmentManagementController::class)->group(function () {
    Route::post('/create-department', 'CreateDepartment')->name('create.department');
    Route::post('/update-department', 'UpdateDepartment')->name('update.department');
});
Route::middleware(['auth', 'verified'])->controller(EmployeeManagementController::class)->group(function () {
    Route::post('/create-employee', 'CreateEmployee')->name('create.employee');
});
Route::middleware(['auth', 'verified'])->controller(DependentManagementController::class)->group(function () {
    Route::post('/dependents/create-dependent', 'CreateDependent')->name('create.dependent');
});
Route::middleware(['auth', 'verified'])->controller(ActivityManagementController::class)->group(function () {
    Route::post('/activities/create-activity', 'CreateActivity')->name('create.activity');
});
Route::middleware(['auth', 'verified'])->controller(AttendeeManagementController::class)->group(function () {
    Route::post('/activities/create-attendee', 'CreateAttendee')->name('create.attendee');
});
Route::middleware(['auth', 'verified'])->controller(ActivityRegisterEmployeeManagementController::class)->group(function () {
    Route::post('/activities/register-employee', 'RegisterEmployee')->name('activity.register.employee');
});

require __DIR__ . '/auth.php';
