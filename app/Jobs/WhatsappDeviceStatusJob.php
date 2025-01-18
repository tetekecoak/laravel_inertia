<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\WhatsappDevice;

class WhatsappDeviceStatusJob implements ShouldQueue
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
        $device = WhatsappDevice::where('phone_number',$this->data['id'])->first();
        if ($device) {
            $device->update(['status' => $this->data['status']]);
            event(new \App\Events\WhatsappQrcodeEvent($this->data,$device->created_by));
        }
    }
}
