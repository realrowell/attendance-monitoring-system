<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ActivityManagementController extends Controller
{
    public $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function CreateActivity(){
        $data = $this->request->validate([
            'activityName' => 'required|string|max:255',
            'activityDesc' => 'required|string|max:255',
            'dateTime' => 'required',
            'activityStatus' => ['nullable',Rule::in(array_keys(Activity::activityStatusOptions()))],
            'activityType' => ['required',Rule::in(array_keys(Activity::participationTypeOptions()))],
        ]);

        $activity = Activity::create([
            'activity_name' => $data['activityName'],
            'activity_desc' => $data['activityDesc'],
            'date_time' => $data['dateTime'],
            'activity_status' => $data['activityStatus'],
            'activity_type' => $data['activityType']
        ]);
    }
}
