<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::all();

        return response($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'user_firstname' => 'required|string',
            'user_lastname' => 'required|string',
            'user_email' => 'required|string|unique:users,user_email',
            'user_contact_no' => 'required|string|max:11',
            'user_password' => 'required|string|min:8'
        ]);
    
        $user = User::create([
            'user_firstname' => $data['user_firstname'],
            'user_lastname' => $data['user_lastname'],
            'user_email' => $data['user_email'],
            'user_contact_no' => $data['user_contact_no'],
            'user_password' => bcrypt($data['user_password'])
        ]);

        $token = $user->createToken('m4rkbello_to_be_fullstack')->plainTextToken;
    
        $response = [
            'success' => true,
            'user' =>  $user,
            'token' => $token
        ];

        \Log::info("DATA SA POST-REGISTER", $response);
        return response($response, 200);
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
        //
    }

    public function updateImage(Request $request, string $id)
    {
        // Validate the incoming request
        $request->validate([
            'user_image' => 'image|mimes:jpeg,png,jpg,gif|max:10240', // Maximum file size: 10MB
        ]);
    
        // Retrieve the uploaded image
        $image = $request->file('user_image');
    
        // Check if an image was uploaded
        if ($image) {
            // Generate a unique image name
            $imageName = time() . '.' . $image->extension();
    
            // Move the uploaded image to the public directory
            $image->move(public_path('images'), $imageName);
    
            // Find the user by ID
            $existingImage = User::find($id);
    
            if ($existingImage) {
                // Log the existing user image details for debugging
                \Log::info('Existing user image:', $existingImage->toArray());
    
                // Update the user's image path
                $existingImage->user_image = $imageName;
                $existingImage->save(); // Save the changes to the database
    
                // Log the updated user image details for debugging
                \Log::info('Updated user image:', $existingImage->toArray());
    
                // Return a success response with updated image details
                return response()->json([
                    'success' => true,
                    'status' => 200,
                    'message' => 'User image updated successfully',
                    'image' => $existingImage->user_image, // Return the image path
                    'image_details' => $existingImage, // Return user details
                ]);
            } else {
                // If user not found, return a 404 error
                return response()->json([
                    'success' => false,
                    'status' => 404,
                    'message' => 'User not found',
                ], 404);
            }
        } else {
            // If no image uploaded, return a 400 error
            return response()->json([
                'success' => false,
                'status' => 400,
                'message' => 'No image uploaded',
            ], 400);
        }
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


}
