<?php

namespace App\Http\Controllers\API;

use App\Actions\Data_fetch\GetEmployeesDependentsByActivitySelect;
use App\Http\Controllers\Controller;

class EmployeeDependentApiController extends Controller
{
    public function __construct() {}

    public function show($ref) {
        $action = new GetEmployeesDependentsByActivitySelect(
            activityRef: $ref
        );

        $data = $action->execute();

        return response()->json(['attendances' => $data,], 200);
    }
}
