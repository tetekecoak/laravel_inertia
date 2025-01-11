<?php

namespace App\Http\Controllers;

use App\Models\BlogMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BlogMetaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogMeta = BlogMeta::all();
        return Inertia::render('BlogMeta/Index', [
            "title" => "BlogMetas",
            "blogMetas" => $blogMeta,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('BlogMeta/Form',[
            "title" => "Add BlogMeta",
        ]);
    }


    public function store(Request $request)
    {
        $validate = $request->validate([
            //'name' => 'required',
        ]);

        $blogMeta = BlogMeta::create($validate);
        return to_route('blogMeta.index')->withSuccess("BlogMeta created successfuly");
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogMeta $blogMeta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogMeta $blogMeta): Response
    {
        return Inertia::render('BlogMeta/Form',[
            "title" => "Edit BlogMeta",
            "blogMeta" => $blogMeta,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogMeta $blogMeta)
    { 
        $validate = $request->validate([
            //'name' => 'required',
        ]);
        $blogMeta->update($validate);
        return to_route('blogMeta.index')->withSuccess("BlogMeta updated successfuly");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogMeta $blogMeta)
    {
        $blogMeta->delete();
        return redirect()->back()->withSuccess("BlogMeta deleted successfuly");
    }
}
