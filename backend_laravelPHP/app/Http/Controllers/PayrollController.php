<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { {
            try {
                $data = Payroll::select(
                    'payrolls.*',
                    'employees.employee_fullname',
                    'employees.employee_email',
                    'departments.department_name',
                    'rates.rate_name',
                    'rates.rate_amount_per_day',
                    'overtimes.overtime_name',
                    'overtimes.overtime_hour',
                    'overtimes.overtime_rate_per_hour',
                    'deductions.deduction_name',
                    'deductions.deduction_amount'
                    )
                    ->leftJoin('employees', 'employees.id', '=', 'payrolls.payroll_employee_id')
                    ->leftJoin('departments', 'departments.id', 'payrolls.payroll_department_id')
                    ->leftJoin('rates', 'rates.id', '=', 'payrolls.payroll_rate_id')
                    ->leftJoin('deductions', 'deductions.id', '=', 'payrolls.payroll_deduction_id')
                    ->leftJoin('overtimes', 'payrolls.payroll_overtime_id', '=', 'overtimes.id')
                    ->get();

                return response()->json([
                    'details' => $data,
                    'success' => true,
                    'status' => 201,
                    'message' => 'Fetch all Payrolls have been successful!',
                ], 201);

            } catch (\Exception $error) {

                return response()->json([
                    'success' => false,
                    'status' => 401,
                    'message' => 'Fetch all payrolls have unsuccessful!',
                    'error' => $error,
                ], 401);

            }
            ;
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
                'message' => 'Payroll not found',
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

            // Find the payroll by ID
            $payroll = Payroll::find($id);

            // Check if the payroll exists
            if (!$payroll) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rate not found',
                    'status' => 404,
                ], 404);
            }

            // Update the payroll with the validated data
            $payroll->update($data);

            // Return the updated payroll data
            return response()->json([
                'data' => $payroll,
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
            $payroll = Payroll::where('id', $id)
                ->where('payroll_status_id', 1) // Example condition
                ->firstOrFail();

            // Update the payroll status
            $payroll->update(['payroll_status_id' => 0]);

            // Return the updated payroll data
            return response()->json([
                'data' => $payroll,
                'success' => true,
                'status' => 200,
            ], 200);

        } catch (ModelNotFoundException $e) {
            // Handle model not found error
            return response()->json([
                'success' => false,
                'message' => 'Payroll not found or condition not met',
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
