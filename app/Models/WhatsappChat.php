<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class WhatsappChat extends Model
{
    protected $guarded = [];
    protected $table = 'chats';
    protected $connection = 'mongodb';
}
