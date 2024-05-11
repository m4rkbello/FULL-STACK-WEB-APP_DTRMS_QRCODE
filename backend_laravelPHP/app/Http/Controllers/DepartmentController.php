<?php

namespace App\Http\Controllers;

use App\Models\department;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;


class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = department::all();
        return response($data, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'dept_name' => 'required|string',
                'dept_description' => 'required|string',
                'dept_status_id' => 'required|integer',
            ]);
    
            $department = department::create([
                'dept_name' => $data['dept_name'],
                'dept_description' => $data['dept_description'],
                'dept_status_id' => $data['dept_status_id'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
    
            $response_data = [
                'success' => true,
                'message' => 'Department has successfully created!',
                'department' => $department,
            ];
    
            return response($response_data, 201);
        } catch (ValidationException $e) {
           
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
            ], 422);
        } 
    }

    /**
     * Display the specified resource.
     */
    public function show(department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, department $id)
    {
        
        $department = department::find($id);
        $department->update($request->all());

        
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Department updated successfully',
            'details' => $department,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(department $department)
    {
        //
    }
}
