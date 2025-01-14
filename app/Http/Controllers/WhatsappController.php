<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\WhatsappDevice;
use App\Services\RabbitMQService;
use Illuminate\Support\Facades\Artisan;

class WhatsappController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {
        $whatsAppDevice = WhatsappDevice::all();
        return Inertia::render('Whatsapp/Index', [
            "title" => "Whatsapp",
            "whatsAppDevice" => $whatsAppDevice
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'phone_number' => 'required|numeric|unique:whatsapp_devices,phone_number'
        ]);
        $validate['status'] = 0;
        WhatsappDevice::create($validate);
        return redirect()->back()->withSuccess("Whatsapp device created successfuly");

    }

    public function scanQrCode(WhatsappDevice $data)
    {

        $rabbitmq = new RabbitMQService;
        $rabbitmq->sendMessage('whatsapp.createConnection',[ "id" => $data->phone_number]);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WhatsappDevice $data)
    {
        $validate = $request->validate([
            'name' => 'required',
            'phone_number' => 'required|numeric|unique:whatsapp_devices,phone_number,'.$data->id
        ]);
        $data->update($validate);
        return redirect()->back()->withSuccess("Whatsapp device updated successfuly");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WhatsappDevice $data)
    {
        $data->delete();
        if($data->status){
            $rabbitmq = new RabbitMQService;
            $rabbitmq->sendMessage('whatsapp.removeConnection',[ "id" => $data->phone_number]);
        }
        return redirect()->back()->withSuccess("Whatsapp device deleted successfuly");

    }
}
