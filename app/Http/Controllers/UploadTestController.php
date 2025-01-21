<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class UploadTestController extends Controller
{
    public function index()
    {
        $files =[
            Storage::disk('s3')->url('avatars/JZjWvQIMbC4ayLoCdLHfXIQY1fG8NvI7HdBTXI04.png'),
            Storage::disk('s3')->temporaryUrl(
                'avatars/vdgMg8slCSBn1WJ7RQBOsZdWsMjZ0mFS75eISPb0.png', now()->addMinutes(5)
            )
        ];
        return Inertia::render('UploadTest', [
            "title" => "Upload Test",
            "files" => $files
        ]);
    }

    public function store(Request $request)

    {
        $validate= $request->validate([
            'file' => 'required|file'
        ]);
        $request->file('file')->storePublicly('public/avatars', 's3');
        return redirect()->back()->withSuccess("oke");
    }
}
