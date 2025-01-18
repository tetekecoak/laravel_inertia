<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\WhatsappChat;
use App\Services\RabbitMQService;

class WhatsappMessageController extends Controller
{
    public function index() : Response{
        $whatsappChat = WhatsappChat::all();
        return Inertia::render('WhatsappChat/Index', [
            "title" => "Chat",
            "whatsappChat" => $whatsappChat
        ]);
    }
}
