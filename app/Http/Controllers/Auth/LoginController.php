<?php

namespace App\Http\Controllers\Auth;

use JWTAuth;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Login\LoginRequest;
use App\Http\Requests\Login\RegisterRequest;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $token = JWTAuth::attempt([
            'email' => $request->get('email'),
            'password' => $request->get('password'),
        ]);

        if (!$token) {
            return response(['wrong_credentials'], 422);
        }

        return response(compact('token'));
    }

    public function register(RegisterRequest $request)
    {
        User::create([
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ]);
        $token = JWTAuth::attempt([
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ]);

        return response(compact('token'));
    }
}
