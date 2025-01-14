<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhatsappDevice extends Model
{
    protected $fillable = [
        'name','phone_number','status'
    ];
}
