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
            if ($this->data['status'] == "CONNECTED") {
                $device->update(['status' => 1]);
            }
            else{
                $device->update(['status' => 0]);
            }
            event(new \App\Events\WhatsappQrcodeEvent($this->data));
        }
    }
}
