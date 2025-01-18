<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\WhatsappProtocolMessage;
use App\Models\WhatsappChat;
use App\Models\WhatsappDevice;

class WhatsappChatConsume implements ShouldQueue
{
    public $data;
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->data as $value) {
            if ($value['message']['protocolMessage'] ?? false) {
                WhatsappProtocolMessage::create($value);
            }else
            $authPhoneNumber = $value['whatsappId'];
            $authId = WhatsappDevice::where('phone_number',$authPhoneNumber)->first()->created_by ?? null;

            if ($authId) {
              
                event(new \App\Events\WhatsappChatEvent($value, $authId));
                WhatsappChat::create($value);

            }
           

        }
    }
}
