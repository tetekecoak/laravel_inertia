<?php

namespace App\Console\Commands;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Illuminate\Console\Command;
use App\Models\WhatsappChat;
use App\Models\WhatsappProtocolMessage;


class RabbitMQConsume extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:consume';

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
        $connection = new AMQPStreamConnection(
            config('rabbitmq.host'),
            config('rabbitmq.port'),
            config('rabbitmq.user'),
            config('rabbitmq.password'),
        );
        $channel = $connection->channel();

        $queues = [
            'whatsapp.deviceStatus',
            'whatsapp.chat',
        ];

         // Deklarasi antrean
        foreach ($queues as $queue) {
            $channel->queue_declare($queue, false, true, false, false,false, [
                'x-queue-type' => ["S","quorum"], // Deklarasikan antrean sebagai quorum
            ]);
        }

        echo "Waiting for messages in queues: " . implode(', ', $queues) . ". To exit press CTRL+C\n";
         // Callback untuk menangani pesan yang diterima
         $callback = function ($msg) {
            // Nama antrean yang sedang diproses
            $queueName = $msg->delivery_info['routing_key'];
            $data = json_decode($msg->body, true);
            if ($queueName == "whatsapp.deviceStatus") {
                \App\Jobs\WhatsappDeviceStatusJob::dispatch($data);
            }
            elseif ($queueName == "whatsapp.chat") {
                foreach ($data as $value) {
                    if ($value['message']['protocolMessage'] ?? false) {
                        WhatsappProtocolMessage::create($value);
                    }else
                    WhatsappChat::create($value);

                }
            }
            echo "Received from queue: {$queueName}\n";
        };

        // Konsumsi pesan dari semua antrean
        foreach ($queues as $queue) {
            $channel->basic_consume($queue, '', false, true, false, false, $callback);
        }

        // Menunggu pesan dan memprosesnya dari semua antrean
        while ($channel->is_consuming()) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();
    }

}
