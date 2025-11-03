<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EmpDetail;
use App\Models\Employee;
use Illuminate\Http\Request;

class GetEmployeeListByNameApiController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query('name');

        // Assuming you have an Employee model to interact with the employees table
        $employees = Employee::whereHas('empDetails', function ($q) use ($name) {
            $q->where('first_name', 'LIKE', '%' . $name . '%')
                ->orWhere('last_name', 'LIKE', '%' . $name . '%');
        })->get();

        return response()->json($employees);
    }
}
