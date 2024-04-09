<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;

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

//EMPLOYEE
Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employee-registration', [EmployeeController::class, 'store']);
Route::get('/employee/{id}', [EmployeeController::class, 'show']);

//ATTENDANCE

 //MIDDLEWARE FOR FRONTEND-BACKEND 
Route::group(['middleware' => ['auth:sanctum']], function(){
    //PROTECTED ACTIONS - DAPAT NAAY TOKEN BAGO MAKA ACCESS DIRI NA ROUTE
    Route::post('/employee/search/', [EmployeeController::class, 'search']);
    Route::put('/employee/{id}', [EmployeeController::class, 'update']);
    Route::put('/employee/deactivated/{id}', [EmployeeController::class, 'deactivate']);
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy']);
});











// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
