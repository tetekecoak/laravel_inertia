<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Garden;
use App\Http\Resources\GardenResource;
use Storage;



class GardenController extends Controller
{
    public function index(){
        $data = Garden::all()->map(function($q){
            $q->image_url = Storage::disk('public')->url('gardens/'.$q->image);
            return $q;
        });
        return $this->responseOK("OK",$data);
    }

    public function show(Garden $data){
        $data->image_url = Storage::disk('public')->url('gardens/'.$data->image);

        return $this->responseOK("OK",$data);
    }


    public function store(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:255',
                'location' => 'nullable|max:255',
            ]);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            Garden::create($validator->validate());
            return $this->responseOK("Garden created successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());

        }
    }

    public function update(Garden $data, Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:255',
                'location' => 'nullable|max:255',
            ]);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            $data->update($validator->validate());
            return $this->responseOK("Garden updated successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
            
        }
    }

    public function destroy(Garden $data){
        try {
            $data->delete();
            return $this->responseOK("Garden deleted successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
        }
    }

    public function uploadImage(Garden $data, Request $request){
        
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|file|mimes:jpg,jpeg,png',
            ]);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            $storeFile = $this->storeStorage('gardens',$request->file('file'),$data->image);
            $data->update(['image'=> $storeFile]);
            return $this->responseOK("Garden deleted successfully");
        } catch (\Throwable $th) {
            return $this->responseInternalServerError($th->getMessage());
        }
    }
}
