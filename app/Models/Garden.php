<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Model;
use Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Garden extends Model
{
    protected $fillable = ['name','location','image'];


    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),
        );
    }

   
}
