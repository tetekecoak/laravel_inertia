<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IotDeviceController;
use App\Http\Controllers\Api\GardenController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/iot-devices', [IotDeviceController::class,'index']);
Route::get('/iot-devices/{data}', [IotDeviceController::class,'show']);
Route::post('/iot-devices', [IotDeviceController::class,'store']);
Route::put('/iot-devices/{data}', [IotDeviceController::class,'update']);
Route::delete('/iot-devices/{data}', [IotDeviceController::class,'destroy']);

Route::get('/gardens', [GardenController::class,'index']);
Route::get('/gardens/{data}', [GardenController::class,'show']);
Route::post('/gardens', [GardenController::class,'store']);
Route::put('/gardens/{data}', [GardenController::class,'update']);
Route::delete('/gardens/{data}', [GardenController::class,'destroy']);
Route::post('/gardens/{data}/upload-image', [GardenController::class,'uploadImage']);
Route::post('/gardens/{data}/devices', [GardenController::class,'addDevices']);
Route::delete('/gardens/{data}/devices', [GardenController::class,'destroyDevice']);
