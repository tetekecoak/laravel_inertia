<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IotDevice;
use Illuminate\Support\Facades\Validator;

class IotDeviceController extends Controller
{
    public function index(){
        $data = IotDevice::all();
        return $this->responseOK("OK",$data);
    }

    public function show(IotDevice $data){
        return $this->responseOK("OK",$data);
    }


    public function store(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'temprature'=>'nullable|numeric',
                'humadity' =>'nullable|numeric',
                'raindrops' => 'nullable|numeric',
                'soil_moisture'=> 'nullable|numeric',
                'is_automatic_pump' => 'nullable|boolean',
                'is_waterpump' => 'nullable|boolean'
            ]);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            IotDevice::create($validator->validate());
            return $this->responseOK("Iot device created successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
            
        }
    }

    public function update(IotDevice $data, Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'temprature'=>'nullable|numeric',
                'humadity' =>'nullable|numeric',
                'raindrops' => 'nullable|numeric',
                'soil_moisture'=> 'nullable|numeric',
                'is_automatic_pump' => 'nullable|boolean',
                'is_waterpump' => 'nullable|boolean'
            ]);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            $data->update($validator->validate());
            return $this->responseOK("Iot device updated successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
            
        }
    }

    public function destroy(IotDevice $data){
        try {
            $data->delete();
            return $this->responseOK("Iot device deleted successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
        }
    }
}
