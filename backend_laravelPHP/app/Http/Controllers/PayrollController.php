<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
        //
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
