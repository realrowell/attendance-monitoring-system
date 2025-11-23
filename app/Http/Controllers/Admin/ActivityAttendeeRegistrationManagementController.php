<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Activities\ActivityAttendeeRegistrationAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ActivityAttendeeRegistrationManagementController extends Controller
{
    public function __construct(protected Request $request)
    {

    }

    public function RegisterAttendee(){
        $result = (new ActivityAttendeeRegistrationAction($this->request))->execute();

        return response()->json($result);
    }
}
