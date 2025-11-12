<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;

class GetEmployeeListByNameApiController extends Controller
{
    public function index($name)
    {

        // Assuming you have an Employee model to interact with the employees table
        $employees = Employee::whereHas('empDetails', function ($q) use ($name) {
            $q->where('first_name', 'LIKE', '%' . $name . '%')
                ->orWhere('last_name', 'LIKE', '%' . $name . '%');
        })->with([
            'departments',
            'empDetails',
            'dependents' => function ($query) {
                $query->where('is_active', true);
            },
        ])
            ->get();

        return response()->json($employees);
    }
}
