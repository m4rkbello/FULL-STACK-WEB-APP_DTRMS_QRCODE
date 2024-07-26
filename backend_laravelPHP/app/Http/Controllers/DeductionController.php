<?php

namespace App\Http\Controllers;
use App\Models\Deduction;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class DeductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $data = Deduction::all();

            return response()->json([
                'department' => $data,
                'success' => true,
                'status' => 201,
            ], 201);

        }catch(\Exception $error){

            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Fetch all Departments have unsuccessful!',
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
                'deduction_name' => 'required|string',
                'deduction_amount' => 'required|integer',
                'deduction_description' => 'required|string',
                'deduction_status_id' => 'required|integer',
            ]);

            $deduction_collection = Deduction::create([
                'deduction_name' => $data['deduction_name'],
                'deduction_amount' => $data['deduction_amount'],
                'deduction_description' => $data['deduction_description'],
                'deduction_status_id' => $data['deduction_status_id'],
                'created_by' => auth()->id(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $response_data = [
                'status' => 201,
                'success' => true,
                'message' => 'Rate has successfully created!',
                'data' => $deduction_collection,
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
        \Log::info('Request data: ', $request->all());
        try {
            // Validate the incoming request data
            $data = $request->validate([
                'deduction_name' => 'required|string',
                'deduction_amount' => 'required|integer',
                'deduction_description' => 'required|string',
                'deduction_status_id' => 'required|integer',
            ]);

            // Find the rate by ID
            $deductions_collection = Deduction::find($id);

            // Check if the rate exists
            if (!$deductions_collection) {
                return response()->json([
                    'success' => false,
                    'message' => 'Deduction not found',
                    'status' => 404,
                ], 404);
            }

            // Update the rate with the validated data
            $deductions_collection->update($data);

            // Return the updated rate data
            return response()->json([
                'data' => $deductions_collection,
                'success' => true,
                'status' => 200,
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
                'message' => 'Deduction not found',
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

            $deduction = Deduction::where('id', 'like', '%' . $data . '%')
                ->orWhere('deduction_name', 'like', '%' . $data . '%')
                ->orWhere('deduction_amount', 'like', '%' . $data . '%')
                ->orWhere('deduction_description', 'like', '%' . $data . '%')
                ->get();

            if ($deduction->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No deduction found for the given search criteria.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Deduction found!',
                'deduction' => $deduction,
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
