<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Rate;
use Illuminate\Validation\ValidationException;
use Illuminatapie\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;


class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index()
    {
        {
            try{
                $data = Rate::all();
    
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
                'rate_name' => 'required|string',
                'employee_amount_per_day' => 'required|integer',
                'rate_details' => 'required|string',
                'rate_description' => 'required|string',
                'rate_status_id' => 'required|integer',
                'rate_department_id' => 'required|string',
            ]);
    
            $rates = Rate::create([
                'rate_name' => $data['rate_name'],
                'employee_amount_per_day' => $data['employee_amount_per_day'],
                'rate_details' => $data['rate_details'],
                'rate_description' => $data['rate_description'],
                'rate_status_id' => $data['rate_status_id'],
                'rate_department_id' => $data['rate_department_id'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
    
            $response_data = [
                'status' => 201,
                'success' => true,
                'message' => 'Rate has successfully created!',
                'details' => $rates,
            ];
    
            return response($response_data, 201);
        } catch (\Exception $error) {

            return response()->json([
                'success' => false,
                'message' => 'Rate has not successfully created!',
                'status' => 401,
                'errors' => $error,
            ], 401);
            
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
