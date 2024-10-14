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

//PUBLIC-ENDPOINTS
//ADMINS
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

//EMPLOYEES
Route::post('/authentication/employee/register',[AuthController::class, 'registerEmployee']);
Route::post('/authentication/emoloyee/login',[AuthController::class, 'loginEmployee']);


Route::prefix('attendances')->group(function () {
    Route::post('/qrcode/data',[AttendanceController::class, 'store']);
});

//WRAPPED BY LARAVEL-SANCTUM FOR SECURITY AUTHENTICATION PURPOSES
Route::middleware('auth:sanctum')->group(function() {
    //ATTENDANCES-ENDPOINTS
    Route::prefix('attendances')->group(function () {
        Route::get('/collections/all',[AttendanceController::class, 'index']);
        Route::get('/qrcode/data/{id}',[AttendanceController::class, 'show']);
        Route::post('/search', [AttendanceController::class, 'search']);
    });
    //PAYROLLS-ENDPOINTS
    Route::prefix('payrolls')->group(function () {
        Route::get('/collections/all',[PayrollController::class, 'index']);
        Route::post('/search', [PayrollController::class, 'search']);
        Route::post('/add', [PayrollController::class, 'store']);
        Route::put('/update/{id}', [PayrollController::class, 'update']);
        Route::put('/deactivate/{id}', [PayrollController::class, 'deactivate']);
    });
    //RATES-ENDPOINTS
    Route::prefix('rates')->group(function () {
        Route::get('/collections/all',[RateController::class, 'index']);
        Route::post('/add', [RateController::class, 'store']);
        Route::put('/update/{id}', [RateController::class, 'update']);
        Route::put('/deactivate/{id}', [RateController::class, 'deactivate']);
        Route::post('/search', [RateController::class, 'search']);
    });
    //DEDECUCTIONS-ENDPOINTS
    Route::prefix('deductions')->group(function () {
        Route::get('/collections/all',[DeductionController::class, 'index']);
        Route::post('/search', [DeductionController::class, 'search']);
        Route::post('/add', [DeductionController::class, 'store']);
        Route::put('/update/item/{id}', [DeductionController::class, 'update']);
        Route::put('/deactivate/{id}', [DeductionController::class, 'deactivate']);
    });
    //DEPARTMENT-ROUTES-ENDPOINTS
    Route::prefix('departments')->group(function () {
        Route::get('/collections/all', [DepartmentController::class, 'index']);
        Route::post('/add', [DepartmentController::class, 'store']);
        Route::put('/update/{id}', [DepartmentController::class, 'update']);
        Route::post('/search', [DepartmentController::class, 'search']);
        Route::put('/deactivate/{id}', [DepartmentController::class, 'deactivate']);
        Route::delete('/delete/{id}', [DepartmentController::class, 'destroy']);
    });
    //OVERTIMES-ENDPOINTS
    Route::prefix('overtimes')->group(function () {
        Route::get('/collections/all',[OvertimeController::class, 'index']);
        Route::post('/search', [OvertimeController::class, 'search']);
        Route::post('/add', [OvertimeController::class, 'store']);
        Route::put('/update/item/{id}', [OvertimeController::class, 'update']);
        Route::put('/deactivate/{id}', [OvertimeController::class, 'deactivate']);
    });
    //AUTHENTICATIONS
    Route::get('/users',[AuthController::class, 'index']);
    Route::post('/update-image/{id}', [AuthController::class, 'updateImage']);
    Route::post('/user/change-password/{id}', [AuthController::class, 'changePassword']);
    Route::put('/user/{id}', [AuthController::class, 'update']);
    // EMPLOYEES
    Route::get('/employee/{id}', [EmployeeController::class, 'show']);
    Route::post('/employee/image/{id}', [EmployeeController::class, 'uploadAndUpdateEmployeeImage']);
    Route::put('/employee/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employee/{id}', [EmployeeController::class, 'destroy']);
    Route::post('/employee/search/', [EmployeeController::class, 'search']);
    Route::put('/employee/deactivated/{id}', [EmployeeController::class, 'deactivate']);
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employee-registration', [EmployeeController::class, 'store']);
    // UPLOAD PICTURE
        Route::get('/images', [ImagesController::class, 'index']);
        Route::post('/image', [ImagesController::class, 'store']);
});




