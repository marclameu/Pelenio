<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['cors'], 'prefix' => 'api'], function(){
	Route::get('usuarios', 'UserController@index');
	Route::get('usuario/{id}', 'UserController@show');

	Route::post('usuario', 'UserController@store');	
    Route::post('login', 'AuthenticateController@login');

    Route::get('seasons', 'SeasonController@index');
    Route::get('season/{id}', 'SeasonController@show');
    Route::post('season', 'SeasonController@store');
    Route::post('season/adicionarPartida', 'SeasonController@adicionarPartida');
});

Route::get('/', function () {
    return view('welcome');
});
