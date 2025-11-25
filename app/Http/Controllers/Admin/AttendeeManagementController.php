<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Attendances\CreateAttendanceRecordAction;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AttDependent;
use App\Models\AttEmployee;
use App\Models\Attendance;
use App\Models\Dependent;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendeeManagementController extends Controller
{
    public $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function CreateAttendee(){

        (new CreateAttendanceRecordAction($this->request))->execute();

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Attendance record created.',
            ]);
        }
    }
