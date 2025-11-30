<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployeeApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function fetch(Request $request){
        Log::info('Fetching employee details for:'. $request->all);
        return [
            "employee" => Employee::where('public_id', $request['id'])
                                    ->orWhere('emp_no', $request['emp_no'])
                                    ->with([
                                        'departments',
                                        'empDetails',
                                        'dependents'=> function ($query) {
                                                $query->where('is_active', true);
                                            },
                                        ])
                                    ->first(),
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show($data)
    {
        // Log::info('Fetching employee details for:', $data);
        // return [
        //     "employee" => Employee::where('public_id', $data['id'])
        //                             ->orWhere('emp_no', $data['emp_no'])
        //                             ->with([
        //                                 'departments',
        //                                 'empDetails',
        //                                 'dependents'=> function ($query) {
        //                                         $query->where('is_active', true);
        //                                     },
        //                                 ])
        //                             ->first(),
        // ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
