<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class OvertimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $overtime = Overtime::all();

            return response()->json([
                'details' => $overtime,
                'success' => true,
                'status' => 201,
                'message' => 'Fetch all Overtimes have been successful!',
            ], 201);

        }catch(\Exception $error){

            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Fetch all Overtimes have unsuccessful!',
                'error' => $error,
            ], 401);
        
        };
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'overtime_name' => 'required|string',
                'overtime_hour' => 'required|integer',
                'overtime_rate_per_hour' => 'required|integer',
                'overtime_description' => 'required|string',
                'overtime_status_id' => 'required|integer',
            ]);

            $overtime_collection = Overtime::create([
                'overtime_name' => $data['overtime_name'],
                'overtime_hour' => $data['overtime_hour'],
                'overtime_rate_per_hour' => $data['overtime_rate_per_hour'],
                'overtime_description' => $data['overtime_description'],
                'overtime_status_id' => $data['overtime_status_id'],
                'created_by' => auth()->id(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $response_data = [
                'status' => 201,
                'success' => true,
                'message' => 'Overtime has successfully created!',
                'data' => $overtime_collection,
            ];

            return response($response_data, 201);

        } catch (ValidationException $e) {

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'status' => 422,
                'errors' => $e->errors(),
            ], 422);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'success' => false,
                'message' => 'Rate not found',
                'status' => 404,
            ], 404);

        } catch (\Exception $error) {

            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
                'status' => 500,
                'errors' => $error->getMessage(),
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
        try {
            // Validate the incoming request data
            $data = $request->validate([
                'overtime_name' => 'required|string',
                'overtime_hour' => 'required|integer',
                'overtime_rate_per_hour' => 'required|integer',
                'overtime_description' => 'required|string',
                'overtime_status_id' => 'required|integer',
            ]);

            // Find the payroll by ID
            $overtime_collection = Overtime::find($id);

            // Check if the payroll exists
            if (!$overtime_collection) {
                return response()->json([
                    'success' => false,
                    'message' => 'Overtime not found!',
                    'status' => 404,
                ], 404);
            }

            // Update the payroll with the validated data
            $overtime_collection->update($data);

            // Return the updated payroll data
            return response()->json([
                'data' => $overtime_collection,
                'success' => true,
                'status' => 200,
                'message' => 'Overtime updated successfully',
            ], 200);

        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'status' => 422,
                'errors' => $e->errors(),
            ], 422);

        } catch (ModelNotFoundException $e) {
            // Handle model not found error
            return response()->json([
                'success' => false,
                'message' => 'Rate not found',
                'status' => 404,
            ], 404);
            
        } catch (\Exception $error) {
            // Handle other exceptions
            return response()->json([
                'success' => false,
                'message' => 'An error occurred',
                'status' => 500,
                'errors' => $error->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deactivate(string $id)
    {
        try {
            // Find the rate by ID and ensure it meets the additional condition(s)
            $overtime_collection = Overtime::where('id', $id)
                ->where('overtime_status_id', 1) // Example condition
                ->firstOrFail();
        
            $overtime_collection->update(['overtime_status_id' => 0]);
        
            // Return the updated rate data
            return response()->json([
                'data' => $overtime_collection,
                'success' => true,
                'status' => 200,
                'message' => 'Overtime item was successfully deactivated!',
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Handle model not found error
            return response()->json([
                'success' => false,
                'message' => 'Deduction not found or condition not met',
                'status' => 404,
                'error' => $e
            ], 404);

        } catch (\Exception $error) {
            // Handle other exceptions
            return response()->json([
                'success' => false,
                'message' => 'An error occurred for deactivating the Deduction!',
                'status' => 500,
                'errors' => $error->getMessage(),
            ], 500);
        }
        
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

            $overtime = Overtime::where('id', 'like', '%' . $data . '%')
                ->orWhere('overtime_name', 'like', '%' . $data . '%')
                ->orWhere('overtime_hour', 'like', '%' . $data . '%')
                ->orWhere('overtime_rate_per_hour', 'like', '%' . $data . '%')
                ->orWhere('overtime_description', 'like', '%' . $data . '%')
                ->get();

            if ($overtime->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No overtime found for the given search criteria.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Overtime found!',
                'data' => $overtime,
            ], 200);

        } catch (\Exception $e) {
            // Log the error for further analysis
            \Log::error('Error in search method: ' . $e->getMessage(), ['exception' => $e]);

            // Return a more detailed error message only if in debug mode
            $errorMessage = config('app.debug') ? $e->getMessage() : 'Failed to search overtime. Please try again later.';

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
            ], 500);
        }
    }
}
