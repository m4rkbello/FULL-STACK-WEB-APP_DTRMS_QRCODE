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
        try{

            $department = department::all();
      
            return response()->json([
                'details' => $department,
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
                'department_name' => 'required|string',
                'department_description' => 'required|string',
                'department_status_id' => 'required|integer',
            ]);
    
            $department = department::create([
                'department_name' => $data['department_name'],
                'department_description' => $data['department_description'],
                'department_status_id' => $data['department_status_id'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
    
            $response_data = [
                'status' => 201,
                'success' => true,
                'message' => 'Department has successfully created!',
                'data' => $department,
            ];
    
            return response($response_data, 201);
        } catch (\Exception $error) {
           
            return response()->json([
                'success' => false,
                'message' => 'Department has not successfully created!',
                'status' => 401,
                'errors' => $error,
            ], 401);
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
                ->orWhere('department_name', 'like', '%' . $data . '%')
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
        try {
            $department = Department::find($id);

            if (!$department) { // Check if $department is null
                return response()->json([
                    'success' => false,
                    'status' => 404,
                    'message' => 'No Department found for the given criteria.',
                ], 404);
            } else {
                $department->delete(); // Use delete() method on the department instance
                return response()->json([
                    'success' => true,
                    'status' => 200,
                    'message' => 'Department deleted successfully.',
                ], 200);
            }
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'Error occurred while deleting department.',
                'error' => $error->getMessage(), // Include the error message in the response
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
