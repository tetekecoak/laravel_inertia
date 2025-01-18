<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedBy;

class WhatsappDevice extends Model
{
    use CreatedBy;
    protected $fillable = [
        'name','phone_number','status','created_by'
    ];
}
