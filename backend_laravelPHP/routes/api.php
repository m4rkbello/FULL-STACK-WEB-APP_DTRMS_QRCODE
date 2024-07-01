<?php

use App\Http\Controllers\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\AttendanceController;

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

Route::prefix('admin')->group(function () {

});

//LOGIN/REGISTER ROUTE-ENDPOINTS
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);


//ATTENDANCE ROUTE-ENDPOINTS
Route::prefix('attendance')->group(function () {
        Route::get('/all',[AttendanceController::class, 'index']);
        Route::post('/qrcode/data',[AttendanceController::class, 'store']);
        Route::get('/qrcode/data/{id}',[AttendanceController::class, 'show']);
});



// MIDDLEWARE FOR FRONTEND-BACKEND  
Route::middleware('auth:sanctum')->group(function() {
    // ADMIN
    Route::get('/users',[AuthController::class, 'index']);
    Route::post('/update-image/{id}', [AuthController::class, 'updateImage']);
    Route::post('/user/change-password/{id}', [AuthController::class, 'changePassword']);
    // EMPLOYEE
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::get('/employee/{id}', [EmployeeController::class, 'show']);
    Route::post('/employee/image/{id}', [EmployeeController::class, 'uploadAndUpdateEmployeeImage']);
    Route::put('/user/{id}', [AuthController::class, 'update']);
    Route::post('/employee-registration', [EmployeeController::class, 'store']);
    Route::put('/employee/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy']);
    Route::post('/employee/search/', [EmployeeController::class, 'search']);
    Route::put('/employee/deactivated/{id}', [EmployeeController::class, 'deactivate']);
    // UPLOAD PICTURE
    Route::get('/images', [ImagesController::class, 'index']);
    Route::post('/image', [ImagesController::class, 'store']);
    //DEPARTMENT-ROUTES-ENDPOINTS
    Route::prefix('department')->group(function () {
        Route::get('/view/all', [DepartmentController::class, 'index']);
        Route::post('/create', [DepartmentController::class, 'store']);
        Route::put('/update/{id}', [DepartmentController::class, 'update']);
        Route::post('/search', [DepartmentController::class, 'search']);
        Route::put('/deactivate/{id}', [DepartmentController::class, 'deactivate']);
        Route::delete('/delete/{id}', [DepartmentController::class, 'destroy']);
    });


});




