<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IotDevice extends Model
{
    protected $fillable = ['name','temprature','humadity','raindrops','soil_moisture','is_automatic_pump','is_waterpump'];
}
