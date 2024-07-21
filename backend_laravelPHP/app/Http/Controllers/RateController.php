<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Rate;
use Illuminate\Validation\ValidationException;
use Illuminatapie\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


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
}
