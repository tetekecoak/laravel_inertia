<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class WhatsappSocketCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'whatsapp:addDevice {data?}';

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
        $data = $this->argument('data');
        $command = "node " . base_path("whatsappAddDevice.js")." ".$data;
        

        if (!$data) {
            $this->error("data not found");
            return 0;
        }

        $output = shell_exec($command);
        // Check if we received output
        if ($output !== null) {
            $this->info($output);
        } else {
            $this->error("Failed to execute the Node.js script.");
        }
 
        return 0; // Success
    }
}
