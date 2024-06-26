<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
        try{
            $data = $request->validate([
                'employee_email' => 'required|string',
            ]);
            
            $employees = Employee::where('employee_email', $data['employee_email'])->first();
    
            if(!$employees){
                return response([
                    'success' => false,
                    'status' => '401',
                    'message' => 'No existing employee!'
                ], 401);
            }

        $employeeId = $employees->id;

        $attendance = Attendance::create([
            'attendance_employee_id' => $employeeId,
            'attendance_note' => $employeeId,
            'attendance_time_in' => Carbon::now(),
            'attendance_time_out' => Carbon::now(),
            'attendance_status' => 1,
        ]);
                // Log the successful operation
                Log::info('Attendance created successfully for employee ID: ' . $employeeId, [
                    'employee_id' => $employeeId,
                    'attendance_id' => $attendance->id,
                    'attendance_time_in' => $attendance->attendance_time_in,
                    'attendance_time_out' => $attendance->attendance_time_out,
                ]);

        return response()->json([
            'success' => true,
            'details' => $attendance,
            'message' => 'Employee has been successfully added!',
        ], 200);

        } catch (\Exception $e) {
       // Log the error
       Log::error('Error creating attendance: ' . $e->getMessage(), [
        'exception' => $e,
    ]);

    return response()->json([
        'success' => false,
        'status' => 500,
        'message' => 'An error occurred while processing your request.',
        'error' => $e->getMessage(),  // Optional: Include the error message for debugging
    ], 500);
        }
    
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
