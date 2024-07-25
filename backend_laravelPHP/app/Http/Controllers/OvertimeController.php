<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class OvertimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $data = Overtime::all();

            return response()->json([
                'department' => $data,
                'success' => true,
                'status' => 201,
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
            $errorMessage = config('app.debug') ? $e->getMessage() : 'Failed to search deduction. Please try again later.';

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
            ], 500);
        }
    }
}
