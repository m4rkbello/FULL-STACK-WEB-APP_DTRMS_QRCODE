<?php

namespace App\Http\Controllers;

use App\Models\Attendance;

use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
            // $data = Attendance::all();
            $data = Attendance::select(
                'attendances.*',
                'employees.employee_fullname'
                )
            ->leftJoin('employees','employees.id','=','attendances.attendance_employee_id')
            ->get();

            return response()->json([
                'details' => $data,
                'success' => true,
                'status' => 201,
                'message' => 'Fetch all Attendance was success!',
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
            return response()->json([
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

        $attendanceCollectionsFilterDescending = Attendance::where('attendance_employee_id', '=', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->orderBy('created_at', 'desc')
            ->first();
        
        $attendanceCollectionsTimeIn = Attendance::where('attendance_employee_id', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->where('attendance_status_id', '=', 1)
            ->exists();

        $attendanceCollectionsTimeout = Attendance::where('attendance_employee_id', $employeeId)
            ->whereDay('created_at', '=', Carbon::today())
            ->where('attendance_status_id', '=', 2)
            ->exists();

        if (!$attendanceCollections) {
            // No attendance record, create a new one
            $attendance = Attendance::create([
                'attendance_employee_id' => $employeeId,
                'attendance_note' => $timeInNote,
                'attendance_time_in' => Carbon::now(),
                'attendance_time_out' => null,
                'attendance_status_id' => 1,
            ]);
        } elseif ($attendanceCollections && $attendanceCollectionsTimeIn && !$attendanceCollectionsTimeout) {
            // Time in exists but no time out, update the attendance record
            // First, retrieve the specific attendance record
            $attendance = Attendance::find($attendanceCollectionsFilterDescending->id);
            
            if ($attendance) {
                $attendance->update([
                    'attendance_note' => $attendance->attendance_note . ', ' . $timeOutNote,
                    'attendance_time_out' => Carbon::now(),
                    'attendance_status_id' => 2,
                ]);
        
                return response()->json([
                    'success' => true,
                    'details' => $attendance,
                    'message' => 'Attendance updated successfully!',
                    'status' => 200,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Attendance record not found',
                    'status' => 404,
                ]);
            }
        } elseif($attendanceCollectionsTimeout){

            // Fallback for handling unexpected cases
            return response()->json([
                'success' => false,
                'details' => $attendanceCollections,
                'message' => 'Duplicated Employee Attendance PATOTOYA!',
                'status' => 406,
            ]);


        } else {
            // Fallback for handling unexpected cases
            return response()->json([
                'success' => false,
                'details' => $attendanceCollections,
                'message' => 'Duplicated Employee Attendance terst!',
                'status' => 406,
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
            'status' => 200,
        ], 200);

    }catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'status' => 404,
            'message' => 'Attendance QR CODE was error!',
            'error' => $e->getMessage(),
        ], 404);
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
