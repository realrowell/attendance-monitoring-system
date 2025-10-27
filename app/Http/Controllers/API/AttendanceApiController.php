<?php

namespace App\Http\Controllers\API;

use App\Actions\Attendances\CreateAttendanceRecordAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AttendanceApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ✅ Expecting a JSON payload with:
        //      - activity_id (ref)
        //      - emp_id (public_id)
        //      - emp_is_present (boolean | nullable)
        //      - part_type (on-site | virtual)
        //      - dependents (array):
        //              - depd_id (public_id)
        //              - depd_is_present (boolean | nullable)
        return (new CreateAttendanceRecordAction($request))->execute();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
