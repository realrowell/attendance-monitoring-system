<?php

use App\Http\Controllers\Admin\AdminPageController;
use App\Http\Controllers\Admin\DepartmentManagementController;
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
Route::middleware(['auth', 'verified'])->controller(AdminPageController::class)->group(function(){
    Route::get('/employees-list', 'EmployeeListPage')->name('employees.list');
    Route::get('/departments-list', 'DepartmentListPage')->name('departments.list');
});

Route::middleware(['auth', 'verified'])->controller(DepartmentManagementController::class)->group(function(){
    Route::post('/create-department', 'CreateDepartment')->name('create.department');
});

require __DIR__.'/auth.php';
