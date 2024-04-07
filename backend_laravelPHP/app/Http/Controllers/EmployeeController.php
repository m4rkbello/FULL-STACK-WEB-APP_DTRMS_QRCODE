<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Employee::all();

        return response($data, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'employee_fullname' => 'required|string',
                'employee_email' => 'required|string|unique:employees,employee_email',
                'employee_contact_no' => 'required|string|max:11',
                'employee_position' => 'required|string',
                'employee_role' => 'required|string',
                'employee_department' => 'required|integer',
                'employee_status' => 'required|integer'
            ]);
    
            $employee = Employee::create([
                'employee_fullname' => $data['employee_fullname'],
                'employee_email' => $data['employee_email'],
                'employee_contact_no' => $data['employee_contact_no'],
                'employee_position' => $data['employee_position'],
                'employee_role' => $data['employee_role'],
                'employee_department' => $data['employee_department'],
                'employee_status' => $data['employee_status'],
            ]);
    
            $response_data = [
                'success' => true,
                'message' => 'Employee has successfully created!',
                'employee' => $employee,
            ];
    
            return response($response_data, 201);
        } catch (ValidationException $e) {
            // If validation fails, return the validation errors
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
            ], 422);
        } 
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $employee = Employee::findOrFail($id);
        
            return response()->json([
                'success' => true,
                'employee' => $employee,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found.',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch employee. Please try again later.',
            ], 500);
        }
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
