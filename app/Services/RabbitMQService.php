<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    protected $connection;
    protected $channel;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection(
            config('rabbitmq.host'),
            config('rabbitmq.port'),
            config('rabbitmq.user'),
            config('rabbitmq.password'),
        );

        $this->channel = $this->connection->channel();
    }

    public function sendMessage(string $queue, $data): void
    {
        $this->channel->queue_declare($queue, false, true, false, false,false, [
            'x-queue-type' => ["S","quorum"], // Deklarasikan antrean sebagai quorum
        ]);

        $messageBody = json_encode($data);
        $message = new AMQPMessage($messageBody, ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]);

        $this->channel->basic_publish($message, '', $queue);

        echo "Message sent to queue: {$queue}\n";
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }
}
