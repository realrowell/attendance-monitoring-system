<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPageController extends Controller
{
    public function EmployeeListPage(){
        return Inertia::render('admin/employee-list');
    }
}
