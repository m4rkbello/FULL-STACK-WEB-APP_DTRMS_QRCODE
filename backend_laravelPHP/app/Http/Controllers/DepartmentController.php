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
      
        try{

            $department = department::all();
            $department = [
                'success' => true,
                'status' => 201,
                'message' => 'Fetch all Departments have successfully!',
                'department' => $department,
            ];

            return response()->json([
                'success' => true,
                'status' => 201,
                'message' => 'Fetch all Departments have successful!',
                'department' => $department,
            ], 201);

        }catch(\Exception $error){
            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Fetch all Departments have unsuccessful!',
                'error' => $error,
            ], 401);
        }
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
        } catch (\Exception $error) {
           
            return response()->json([
                'success' => false,
                'errors' => $error,
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

    public function search(Request $request){
        try {
            $data = $request->input('data');
            
            $department = department::where('id', 'like', '%' . $data . '%')
                ->orWhere('dept_name', 'like', '%' . $data . '%')
                ->get();
    
            if ($department->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'status' => 404,
                    'message' => 'No Department found for the given search criteria.',
                ], 404);
            }else{
                return response()->json([
                    'success' => true,
                    'status' => 200,
                    'department' => $department,
                ], 200);
            }
    
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'Failed to search department. Please try again later.',
                'error' => $error
            ], 500);
        }
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
    public function update(Request $request, string $id)
    {
        try{
            $department = department::find($id);
            $department->update($request->all());
    
            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Department updated successfully',
                'details' => $department,
            ]);
        } catch(\Exception $error){
            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => $error,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try{

            $department = department::destroy($id);
    
            return response()->json([
                'success' => true,
                'status' => 200,
                'message' => 'Department has deleted successfully!',
                'details' => $department,
            ]);

        }catch(\Exception $error){
            return response()->json([
                'success' => true,
                'status' => 401,
                'message' => 'Department has not deleted!',
                'error' => $error,
            ]);
        }
    }

    public function deactivate(Request $request, string $id){
        
        try{
            $department = department::find($id);
            $department->update(['dept_status_id' => 0]);

            return response()->json([
                'success' => true,
                'status' => 201,
                'message' => 'Department has deactivated successfully!',
                'data' => $department
            ]);

        }catch(\Exception $error){
            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Department not deactivated successfully!',
            ]);

        }
    }

}
