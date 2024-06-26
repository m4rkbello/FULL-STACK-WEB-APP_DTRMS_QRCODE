<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Attendance::all();

        return response($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'employee_email' => 'required|string',
        ]);
        
        $employees = Employee::where('employee_email', $data['employee_email'])->first();

        $employeeId = $employees->id;

        $attendance = Employee::create([
            'attendance_employee_id' => $employeeId,
            'attendance_note' => $employeeId,
            'attendance_time_in' => Carbon::now(),
            'attendance_time_out' => Carbon::now(),
            'attendance_status' => 1,
        ]);

        



        






        


        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
