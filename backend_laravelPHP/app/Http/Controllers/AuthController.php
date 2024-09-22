<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


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
                'user_contact_no' => 'required|string|max:11|unique:users,user_contact_no', // Add unique rule for contact number
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
            'user_password' => 'required|string'
            ]);

        $user = User::where('user_email', $data['user_email'])->first();
        $user_token_id = $user->id;
        $user_id = $user_token_id;

        $token = DB::table('personal_access_tokens')
        ->where('tokenable_id','=',$user_token_id)
        ->first();

        $token_data = $token->token;

        $token = $user->createToken('m4rkbello_to_be_fullstack')->plainTextToken;

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


//USER CHANG
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
    


}
