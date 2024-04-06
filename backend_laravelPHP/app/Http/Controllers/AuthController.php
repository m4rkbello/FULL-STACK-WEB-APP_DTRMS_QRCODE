<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $data = $request->validate(
                [
                    'user_firstname' => 'min:100|max:255|string|require|',
                    'user_lastname' => 'min:100|max:255|string|require|',
                    'user_email' => 'min:100|max:255|string|unique:users,email',
                    'user_contact_no' => 'min:100|max:255|string|require|',
                    'user_password' => 'min:100|max:255|string|require|'
                ]
            );

        $user = User::create(
            [
                'user_firstname' => $data['user_firstname'],
                'user_lastname' => $data['user_lastname'],
                'user_email' => $data['user_email'],
                'user_contact_no' => $data['user_contact_no'],
                'user_password' => bcrypt($data['user_password'])
            ]
        );



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
