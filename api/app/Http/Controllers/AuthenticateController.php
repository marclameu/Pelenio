<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuthServiceProvider;
use Illuminate\Support\Facades\Input;
use App\User;

class AuthenticateController extends Controller
{   

/*
   public function register(Request $request)
    {        
        $input = $request->all();
        //dd($input);
        $input['password'] = \Hash::make($input['password']);
        User::create($input);
        return response()->json(['result'=>true]);
    }
    */

    public function login(Request $request)
    {
        //$input = $request->all();        
        $credentials = $request->only('email', 'password');        
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['result' => 'Email ou senha incorretos!'], 500);
        }
            return response()
                ->json(['result' => 'Usuário logado com sucesso!'], 200, ['Authorization' => 'Bearer '.$token]);         
    }   

    
    public function get_user_details(Request $request)
    {
        $input = $request->all();
        $user = JWTAuth::toUser($input['token']);
        return response()->json(['result' => $user]);
    }
}
