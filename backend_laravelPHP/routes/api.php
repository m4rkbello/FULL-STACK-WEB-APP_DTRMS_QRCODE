<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ImagesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//AUTHENTICATION FOR ADMIN
Route::get('/users',[AuthController::class, 'index']);
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/update-image/{id}', [AuthController::class, 'updateImage']);


//EMPLOYEE
Route::get('/employees', [EmployeeController::class, 'index']);
Route::get('/employee/{id}', [EmployeeController::class, 'show']);

//ATTENDANCE

//MIDDLEWARE FOR FRONTEND-BACKEND 
Route::post('/employee-registration', [EmployeeController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::put('/employee/{id}', [EmployeeController::class, 'update']);
    Route::post('/employee/search/', [EmployeeController::class, 'search']);
    Route::put('/employee/deactivated/{id}', [EmployeeController::class, 'deactivate']);
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy']);
});


//UPLOAD PICTURE
Route::get('/images', [ImagesController::class, 'index']);
Route::post('/image', [ImagesController::class, 'store']);
