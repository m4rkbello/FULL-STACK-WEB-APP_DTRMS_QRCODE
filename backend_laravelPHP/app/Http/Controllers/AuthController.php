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
            'user_contact_no' => 'required|string|max:12',
            'user_password' => 'required|string'
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
