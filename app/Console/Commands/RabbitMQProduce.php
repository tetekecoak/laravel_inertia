<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\RabbitMQService;

class RabbitMQProduce extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:test-produce';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $rabbitMQ = new RabbitMQService();
        $rabbitMQ->sendMessage('whatsapp.qrcode', [
            'id' => 'filepath123',
            'qr' => 'qrcode_data',
            'status' => 'NEW',
        ]);
    }
}
