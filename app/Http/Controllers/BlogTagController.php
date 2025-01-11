<?php

namespace App\Http\Controllers;

use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class BlogTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogTag = BlogTag::all();
        return Inertia::render('Blog/Tag/Index', [
            "title" => "Blog Tags",
            "tags" => $blogTag,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Blog/Tag/Form',[
            "title" => "Add Blog Tag",
        ]);
    }


    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|unique:blog_tags,title',
            'content' => 'nullable'
        ]);

        $validate['meta_title'] =$validate['title'];
        $validate['slug'] =Str::slug($validate['title']);

        $blogTag = BlogTag::create($validate);
        return to_route('blog-tags.index')->withSuccess("Blog Tag created successfuly");
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogTag $blogTag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogTag $tag): Response
    {
        return Inertia::render('Blog/Tag/Form',[
            "title" => "Edit Blog Tag",
            "tag" => $tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogTag $tag)
    { 
        $validate = $request->validate([
            'title' => 'required|unique:blog_tags,title,'.$tag->id,
            'content' => 'nullable'

        ]);
        $validate['meta_title'] =$validate['title'];
        $validate['slug'] =Str::slug($validate['title']);
        
        $tag->update($validate);
        return to_route('blog-tags.index')->withSuccess("Blog Tag updated successfuly");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogTag $tag)
    {
        $tag->delete();
        return redirect()->back()->withSuccess("Blog Tag deleted successfuly");
    }
}
