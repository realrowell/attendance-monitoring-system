<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Employee;
use Illuminate\Http\Request;

class ActivityRegisterEmployeeManagementController extends Controller
{
    public function __construct(protected Request $request)
    {
        throw new \Exception('Not implemented');
    }

    public function RegisterEmployee(){
        $data = $this->request->validate([
            'emp_id' => 'required|array',
            'activity_id' => 'required|string'
        ]);

        $activity = Activity::where('ref', $data['activity_id'])->where('activity_status', 'published')->first();

        for($i=0; $i < count($data['emp_id']); $i++){
            $employee = Employee::where('public_id', $data['emp_id'])->where('is_active', true)->first();
            //continue here to store employee on emp_act_registers table
        }
    }
}
