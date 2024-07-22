<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//ALL CONTROLLERS
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\OvertimeController;

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
Route::prefix('attendances')->group(function () {
        Route::get('/all',[AttendanceController::class, 'index']);
        Route::post('/qrcode/data',[AttendanceController::class, 'store']);
        Route::get('/qrcode/data/{id}',[AttendanceController::class, 'show']);
        Route::post('/search', [AttendanceController::class, 'search']);
});
//PAYROLLS-ENDPOINTS
Route::prefix('payrolls')->group(function () {
    Route::get('/all',[PayrollController::class, 'index']);
    Route::post('/search', [PayrollController::class, 'search']);

});
//RATES-ENDPOINTS
Route::prefix('rates')->group(function () {
    Route::get('/all',[RateController::class, 'index']);
    Route::post('/add', [RateController::class, 'store']);
    Route::put('/item/{id}', [RateController::class, 'update']);


});
//DEDECUCTION-ENDPOINTS
Route::prefix('deductions')->group(function () {
    Route::get('/all',[DeductionController::class, 'index']);
    Route::post('/search', [DeductionController::class, 'search']);


});

//OVERTIME-ENDPOINTS
Route::prefix('overtimes')->group(function () {
    Route::get('/all',[OvertimeController::class, 'index']);

});



Route::middleware('auth:sanctum')->group(function() {
    // MIDDLEWARE FOR FRONTEND-BACKEND  
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
    
    Route::prefix('departments')->group(function () {
        Route::get('/view/all', [DepartmentController::class, 'index']);
        Route::post('/create', [DepartmentController::class, 'store']);
        Route::put('/update/{id}', [DepartmentController::class, 'update']);
        Route::post('/search', [DepartmentController::class, 'search']);
        Route::put('/deactivate/{id}', [DepartmentController::class, 'deactivate']);
        Route::delete('/delete/{id}', [DepartmentController::class, 'destroy']);
    });
});




