<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;


class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        {
            try{
                $data = Payroll::all();
    
                return response()->json([
                    'data' => $data,
                    'success' => true,
                    'status' => 201,
                ], 201);
    
            }catch(\Exception $error){
    
                return response()->json([
                    'success' => false,
                    'status' => 401,
                    'message' => 'Fetch all payrolls have unsuccessful!',
                    'error' => $error,
                ], 401);
                
            };
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'payroll_details' => 'required|string',
                'payroll_total_amount' => 'required|integer',
                'payroll_description' => 'required|string',
                'payroll_status_id' => 'required|integer',
                'payroll_employee_id' => 'required|integer',
                'payroll_department_id' => 'required|integer',
                'payroll_rate_id' => 'required|integer',
                'payroll_deduction_id' => 'required|integer',
                'payroll_overtime_id' => 'required|integer',
            ]);

            $payroll = Payroll::create([
                'payroll_details' => $data['payroll_details'],
                'payroll_total_amount' => $data['payroll_total_amount'],
                'payroll_description' => $data['payroll_description'],
                'payroll_status_id' => $data['payroll_status_id'],
                'payroll_employee_id' => $data['payroll_employee_id'],
                'payroll_department_id' => $data['payroll_department_id'],
                'payroll_rate_id' => $data['payroll_rate_id'],
                'payroll_deduction_id' => $data['payroll_deduction_id'],
                'payroll_overtime_id' => $data['payroll_overtime_id'],
                'payroll_created_by' => auth()->id(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $response_data = [
                'status' => 201,
                'success' => true,
                'message' => 'Payroll has successfully created!',
                'details' => $payroll,
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

            $payrolls_collection = Payroll::where('id', 'like', '%' . $data . '%')
                ->orWhere('payroll_details', 'like', '%' . $data . '%')
                ->orWhere('payroll_total_amount', 'like', '%' . $data . '%')
                ->orWhere('payroll_description', 'like', '%' . $data . '%')
                ->get();

            if ($payrolls_collection->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No deduction found for the given search criteria.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Payroll found!',
                'deduction' => $payrolls_collection,
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
