<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Model;
use Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Garden extends Model
{
    protected $fillable = ['name','location','image'];


    public function iotDevices()
    {
        return $this->belongsToMany(IotDevice::class, 'garden_iot_devices', 'garden_id', 'iot_device_id');
    }

   
}
