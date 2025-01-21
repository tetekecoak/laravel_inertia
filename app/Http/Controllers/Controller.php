<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use Storage;

abstract class Controller
{
    public function responseOK(string $message,$data = null){
        if ($data !== null) {
            return response()->json(['message' => $message ?? "OK", 'data' => $data],200);
        }else{
            return response()->json(['message' => $message],200);
        }
    }
    public function responseErrorValidation($data = null){
        if ($data !== null) {
            return response()->json(['message' => "Error validation", 'errors' => $data],422);
        }
    }
    public function responseInternalServerError($data = null){
        if ($data !== null) {
            return response()->json(['message' => "Internal server error", 'error' => $data],500);
        }
    }

    public function storeStorage($dir,$fileNew, $fileExist = null) : string{
        $extension = $fileNew->getClientOriginalExtension();
        $nameFile = (string) Str::ulid().".".$extension;


        if ($fileExist && Storage::exists($dir."/".$fileExist)) {
            Storage::delete($dir."/".$fileExist);
        }
        $fileNew->storeAs(
             $dir,
             $nameFile,
            'public'
        );
        return $nameFile;
    }
}
