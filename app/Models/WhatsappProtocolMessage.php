<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class WhatsappProtocolMessage extends Model
{
    protected $guarded = [];
    protected $table = 'protocol_message';
    protected $connection = 'mongodb';
}
