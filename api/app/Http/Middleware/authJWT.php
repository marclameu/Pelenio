<?php namespace App\Http\Middleware;
use Closure;
use JWTAuth;
use Exception;
class authJWT
{
    public function handle($request, Closure $next)
    {
        try {
            //$user = JWTAuth::toUser($request->input('token'));
            $user = JWTAuth::toUser(JWTAuth::getToken());
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['error'=>'Token invalido'], 401);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['error'=>'Token expirado!'], 401);
            }else{
                return response()->json(['error'=>'Nao autorizado!'], 401);
            }
        }
        return $next($request);
    }
}
