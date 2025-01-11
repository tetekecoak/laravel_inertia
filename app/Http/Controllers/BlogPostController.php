<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogPost = BlogPost::all();
        return Inertia::render('BlogPost/Index', [
            "title" => "BlogPosts",
            "blogPosts" => $blogPost,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('BlogPost/Form',[
            "title" => "Add BlogPost",
        ]);
    }


    public function store(Request $request)
    {
        $validate = $request->validate([
            //'name' => 'required',
        ]);

        $blogPost = BlogPost::create($validate);
        return to_route('blogPost.index')->withSuccess("BlogPost created successfuly");
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost): Response
    {
        return Inertia::render('BlogPost/Form',[
            "title" => "Edit BlogPost",
            "blogPost" => $blogPost,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogPost $blogPost)
    { 
        $validate = $request->validate([
            //'name' => 'required',
        ]);
        $blogPost->update($validate);
        return to_route('blogPost.index')->withSuccess("BlogPost updated successfuly");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();
        return redirect()->back()->withSuccess("BlogPost deleted successfuly");
    }
}
