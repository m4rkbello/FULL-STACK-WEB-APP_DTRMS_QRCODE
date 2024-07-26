<?php

namespace App\Http\Controllers;

use App\Models\Attendance;

use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $data = Attendance::all();

            return response()->json([
                'data' => $data,
                'success' => true,
                'status' => 201,
            ], 201);

        }catch(\Exception $error){

            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Fetch all Attendance have unsuccessful!',
                'error' => $error,
            ], 401);
            
        };

    }

    /**
     * Store a newly created resource in storage.
     */

public function store(Request $request)
{
    Log::info('Received attendance request', ['data' => $request->all()]);

    try {
        $data = $request->validate([
            'employee_email' => 'required|string',
        ]);

        Log::info('Validated request data', $data);

        $isStatusActive = 1;

        $employee = Employee::where('employee_email', $data['employee_email'])
            ->where('employee_status_id','=',$isStatusActive)    
            ->first();

        if (!$employee) {
            Log::warning('Employee not found', ['employee_email' => $data['employee_email']]);
            return response([
                'success' => false,
                'status' => 401,
                'message' => 'No existing employee!',
            ], 401);
        }

        $employeeId = $employee->id;
        $timeInNote = 'Time-in';
        $timeOutNote = 'Time-out';
  

        $attendanceCollections = Attendance::where('attendance_employee_id', '=', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->exists();

        $attendanceCollectionsTimeIn = Attendance::where('attendance_employee_id', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->where('attendance_status_id', '=', 1)
            ->whereTime('created_at', '<', '12:00:00')
            ->exists();

        $attendanceCollectionsTimeout = Attendance::where('attendance_employee_id', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->where('attendance_status_id', '=', 2)
            ->exists();

        if (!$attendanceCollections) {
            $attendance = Attendance::create([
                'attendance_employee_id' => $employeeId,
                'attendance_note' => $timeInNote,
                'attendance_time_in' => Carbon::now(),
                'attendance_time_out' => null,
                'attendance_status_id' => 1,
            ]);
        } elseif ($attendanceCollectionsTimeIn && $attendanceCollectionsTimeout) {
            return response()->json([
                'success' => false,
                'details' => $attendanceCollections,
                'message' => 'Duplicated Employee Attendance!',
            ]);
        } elseif ($attendanceCollectionsTimeIn || !$attendanceCollectionsTimeout) {
            $attendance = Attendance::create([
                'attendance_employee_id' => $employeeId,
                'attendance_note' => $timeOutNote,
                'attendance_time_in' => null,
                'attendance_time_out' => Carbon::now(),
                'attendance_status_id' => 2,
            ]);
        }  else {
            return response()->json([
                'success' => false,
                'details' => $attendanceCollections,
                'message' => 'Duplicated Employee Attendance!',
            ]);
        }

        Log::info('Attendance created successfully', [
            'employee_id' => $employeeId,
            'attendance_id' => $attendance->id,
            'attendance_time_in' => $attendance->attendance_time_in,
            'attendance_time_out' => $attendance->attendance_time_out,
            'parse' => $attendanceCollections,
        ]);

        return response()->json([
            'success' => true,
            'details' => $attendance,
            'message' => 'Employee has been successfully added!',
        ], 200);
    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation error: ' . $e->getMessage(), ['errors' => $e->errors()]);
        return response()->json([
            'success' => false,
            'status' => 422,
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        Log::error('Model not found: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'status' => 404,
            'message' => 'Resource not found',
        ], 404);
    } catch (\Exception $e) {
        Log::error('Error creating attendance: ' . $e->getMessage(), [
            'exception' => get_class($e),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString(),
        ]);

        return response()->json([
            'success' => false,
            'status' => 500,
            'message' => 'An error occurred while processing your request.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $employee = Attendance::findOrFail($id);
        
            return response()->json([
                'success' => true,
                'employee' => $employee,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch employee. Please try again later.',
            ], 500);
        }
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

    public function search(Request $request)
    {
        //EVALIDATE NA TAAS PANG GIINPUT OR GAMAY!
        $validator = Validator::make($request->all(), [
            'data' => 'required|string|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid search input.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $data = $request->input('data');

            $attendance = Attendance::where('id', 'like', '%' . $data . '%')
                ->orWhere('attendance_employee_id', 'like', '%' . $data . '%')
                ->orWhere('attendance_note', 'like', '%' . $data . '%')
                ->orWhere('attendance_time_in', 'like', '%' . $data . '%')
                ->orWhere('attendance_time_out', 'like', '%' . $data . '%')
                ->get();

            if ($attendance->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No attendance found for the given search criteria.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Deduction found!',
                'attendance' => $attendance,
            ], 200);
        } catch (\Exception $e) {
            // Log the error for further analysis
            \Log::error('Error in search method: ' . $e->getMessage(), ['exception' => $e]);

            // Return a more detailed error message only if in debug mode
            $errorMessage = config('app.debug') ? $e->getMessage() : 'Failed to search deduction. Please try again later.';

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
            ], 500);
        }
    }
}
