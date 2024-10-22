<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use App\Models\Opensourseintelligences;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $users_collection = User::all();

            return response()->json([
                'data' => $users_collection,
                'success' => true,
                'message' => 'Fetch all Users successfully!',
                'status' => 201,
            ], 201);

        }catch(\Exception $error){

            return response()->json([
                'success' => false,
                'status' => 401,
                'message' => 'Fetch all Users have unsuccessful!',
                'error' => $error,
            ], 401);
            
        };
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        try {
            // Validate incoming request data
            $data = $request->validate([
                'user_firstname' => 'required|string',
                'user_lastname' => 'required|string',
                'user_email' => 'required|string|unique:users,user_email',
                'user_contact_no' => 'required|string|max:11|unique:users,user_contact_no', 
                'user_password' => 'required|string|min:8'
            ]);
    
            // Create a new user
            $user = User::create([
                'user_firstname' => $data['user_firstname'],
                'user_lastname' => $data['user_lastname'],
                'user_email' => $data['user_email'],
                'user_contact_no' => $data['user_contact_no'],
                'user_password' => bcrypt($data['user_password'])
            ]);
    
            // Generate an authentication token
            $token = $user->createToken('m4rkbello_to_be_fullstack')->plainTextToken;
    
            // Prepare success response
            $response = [
                'success' => true,
                'user' => $user,
                'token' => $token
            ];
    
            \Log::info("DATA SA POST-REGISTER", $response);
            return response()->json($response, 201);
    
        } catch (\Exception $error) {
            // Log the error message
            \Log::error('Registration error: ' . $error->getMessage());
    
            // Prepare error response
            return response()->json([
                'success' => false,
                'message' => 'Registration failed! ' . $error->getMessage(),
                'status' => 500
            ], 500);
        }
    }
    
    public function login(Request $request){
        $data = $request->validate([
            'user_email' => 'required|string',
            'user_password' => 'required|string',
            'osint_public_ip' => 'nullable|string', // Change to string if IP is passed as a string
            'osint_latitude' => 'nullable|numeric', // Use numeric for latitude
            'osint_longitude' => 'nullable|numeric', // Use numeric for longitude
        ]);

        $user = User::where('user_email', $data['user_email'])->first();
        $user_token_id = $user->id;
        $user_id = $user_token_id;

        $token = DB::table('personal_access_tokens')
        ->where('tokenable_id','=',$user_token_id)
        ->first();

        $token_data = $token->token;

        $token = $user->createToken('m4rkbello_to_be_fullstack')->plainTextToken;

       // Create a new user
       Opensourseintelligences::create([
            'osint_public_ip' => $data['osint_public_ip'],
            'osint_latitude' => $data['osint_latitude'],
            'osint_longitude' => $data['osint_longitude'],
            'osint_user_id' => $user_token_id,
            'osint_empployee_id' => null,
        ]);

        if(!$user || !hash::check($data['user_password'], $user->user_password)){
            return response([
                'success' => false,
                'status' => '401',
                'message' => 'email or password is incorrect!'
            ], 401);
            
        }else{
            return response([
                'success' => true,
                'message' => 'Login successful!',
                'personal_access_tokens' => $token_data,
                'user_id' => $user_id,
                'token' => $token,
                'user' => [
                    'user_firstname' => $user->user_firstname,
                    'user_lastname' => $user->user_lastname,
                    'user_email' => $user->user_email,
                    'user_contact_no' => $user->user_contact_no,
                    'user_password' => $user->user_password
                ],
            ]);
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
        $user = User::find($id);
        $user->update($request->all());

        // return response($user, 201);
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'User updated successfully',
            'details' => $user,
        ]);
    }

    public function updateImage(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Max size is 10MB lang 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'status' => 400,
                'message' => $validator->errors()->first('user_image'),
            ]);
        }
    
        $user = User::findOrFail($id);
    
        if ($request->hasFile('user_image')) {
            $image = $request->file('user_image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = public_path('images') . '/' . $imageName;
    
            // Delete the previous image if it exists
            if ($user->user_image) {
                $existingImagePath = public_path($user->user_image);
                if (File::exists($existingImagePath)) {
                    File::delete($existingImagePath);
                }
            }
    
            // Move the new image to the images directory
            $image->move(public_path('images'), $imageName);
    
            // Update the user's image path with the full URL
            $user->user_image = url('images/' . $imageName);
        }
    
        // Save the user object
        $user->save();
    
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'User image updated successfully',
            'image_url' => $user->user_image, // Directly use the updated user image path
            'image_details' => $user,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'img_name' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'img_status_id' => 'required',
            'img_user_id' => 'required',
            'img_emp_id' => 'required',
        ]);
    
        $image = $request->file('img_name');
    
        // Check if a file was actually uploaded
        
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function changePassword(Request $request, string $id)
    {
        $user = User::find($id);
    
        // Validate request data, if needed
        $data = $request->validate([
            'user_password' => 'required|string|min:8'
        ]);
    
        // Update the user's password with bcrypt hash
        $user->update([
            'user_password' => bcrypt($data['user_password'])
        ]);
    
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Password updated successfully',
            'details' => $user,
        ]);
    }

    //FOR EMPLOYEE REGISTRATION 
    public function registerEmployee(Request $request)
    {
        try {
            // Validate incoming request data
            $data = $request->validate([
                'employee_firstname' => 'required|string',
                'employee_middlename' => 'nullable|string',
                'employee_lastname' => 'required|string',
                'employee_extensionname' => 'nullable|string',
                'employee_username' => 'required|string|unique:employees,employee_username',
                'employee_email' => 'required|string|email|unique:employees,employee_email',
                'employee_password' => 'required|string|min:8',
                'employee_contact_no' => 'required|string|max:11|unique:employees,employee_contact_no',
                'employee_barangay' => 'nullable|string',
                'employee_municipality' => 'nullable|string',
                'employee_province' => 'nullable|string',
                'employee_region' => 'nullable|string',
                'employee_birthdate' => 'required|date',
                'employee_civil_status_id' => 'required|integer',
                'employee_position' => 'nullable|string',
                'employee_role' => 'nullable|string',
                'employee_department_id' => 'required|integer',
                'employee_status_id' => 'required|integer',
                'employee_image' => 'nullable|string',
                'employee_qrcode' => 'nullable|string',
                'employee_sss_no' => 'nullable|string|max:255',
                'employee_pagibig_no' => 'nullable|string|max:255',
                'employee_philhealth_no' => 'nullable|string|max:255',
                'employee_tin_no' => 'nullable|string|max:255'
            ]);
    
            // Create a new employee
            $employee = Employee::create([
                'employee_firstname' => $data['employee_firstname'],
                'employee_middlename' => $data['employee_middlename'] ?? null,
                'employee_lastname' => $data['employee_lastname'],
                'employee_extensionname' => $data['employee_extensionname'] ?? null,
                'employee_username' => $data['employee_username'],
                'employee_email' => $data['employee_email'],
                'employee_password' => bcrypt($data['employee_password']),
                'employee_contact_no' => $data['employee_contact_no'],
                'employee_barangay' => $data['employee_barangay'] ?? null,
                'employee_municipality' => $data['employee_municipality'] ?? null,
                'employee_province' => $data['employee_province'] ?? null,
                'employee_region' => $data['employee_region'] ?? null,
                'employee_birthdate' => $data['employee_birthdate'],
                'employee_civil_status_id' => $data['employee_civil_status_id'],
                'employee_position' => $data['employee_position'] ?? null,
                'employee_role' => $data['employee_role'] ?? null,
                'employee_department_id' => $data['employee_department_id'],
                'employee_status_id' => $data['employee_status_id'],
                'employee_image' => $data['employee_image'] ?? null,
                'employee_qrcode' => $data['employee_qrcode'] ?? null,
                'employee_sss_no' => $data['employee_sss_no'] ?? null,
                'employee_pagibig_no' => $data['employee_pagibig_no'] ?? null,
                'employee_philhealth_no' => $data['employee_philhealth_no'] ?? null,
                'employee_tin_no' => $data['employee_tin_no'] ?? null
            ]);
    
            // Generate an authentication token
            $token = $employee->createToken('m4rkbello_to_be_fullstack')->plainTextToken;
    
            // Prepare success response
            $response = [
                'success' => true,
                'employee' => $employee,
                'token' => $token
            ];
    
            Log::info("Employee Registration Successful", $response);
            return response()->json($response, 201);
    
        } catch (\Illuminate\Validation\ValidationException $validationError) {
            // Handle validation errors
            Log::error('Validation error: ' . $validationError->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Validation failed! ' . $validationError->getMessage(),
                'status' => 422
            ], 422);
    
        } catch (\Exception $error) {
            // Log the error message for debugging
            Log::error('Registration error: ' . $error->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'Employee registration failed! ' . $error->getMessage(),
                'status' => 500
            ], 500);
        }
    }
    
    public function loginEmployee(Request $request)
    {
        try {
            $data = $request->validate([
                'employee_email' => 'required|string|email',
                'employee_password' => 'required|string',
                'osint_public_ip' => 'nullable|string',
                'osint_latitude' => 'nullable|numeric',
                'osint_longitude' => 'nullable|numeric',
            ]);

            $employee = Employee::where('employee_email', $data['employee_email'])->first();

            if (!$employee || !Hash::check($data['employee_password'], $employee->employee_password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email or password is incorrect!',
                    'status' => 401
                ], 401);
            }

            $token = $employee->createToken('m4rkbello_to_be_fullstack')->plainTextToken;

            Opensourseintelligences::create([
                'osint_public_ip' => $data['osint_public_ip'],
                'osint_latitude' => $data['osint_latitude'],
                'osint_longitude' => $data['osint_longitude'],
                'osint_employee_id' => $employee->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful!',
                'token' => $token,
                'employee' => [
                    'id' => $employee->id,
                    'employee_firstname' => $employee->employee_firstname,
                    'employee_lastname' => $employee->employee_lastname,
                    'employee_email' => $employee->employee_email,
                    'employee_contact_no' => $employee->employee_contact_no,
                ]
            ]);

        } catch (\Exception $error) {
            Log::error('Login error: ' . $error->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Login failed! ' . $error->getMessage(),
                'status' => 500
            ], 500);
        }
    }
    

    
    


}
