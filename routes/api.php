<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function () {
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/register', 'Auth\LoginController@register');

    Route::get('/items', 'ItemController@index');
});

Route::group(['middleware' => 'api.auth'], function () {
    Route::get('/auth/verify', function () { return response(['verified' => true]); });

    Route::resource('/items', 'ItemController', ['only' => ['store', 'destroy']]);
});
