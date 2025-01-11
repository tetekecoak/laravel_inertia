<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;


class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogCategory = BlogCategory::all();
        return Inertia::render('Blog/Category/Index', [
            "title" => "Blog Categories",
            "categories" => $blogCategory,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Blog/Category/Form',[
            "title" => "Add Blog Category",
        ]);
    }


    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|unique:blog_tags,title',
            'content' => 'nullable'
        ]);

        $validate['title'] = Str::title($validate['title']);
        $validate['meta_title'] =$validate['title'];
        $validate['slug'] =Str::slug($validate['title']);

        $blogCategory = BlogCategory::create($validate);
        return to_route('blog-categories.index')->withSuccess("Blog Category created successfuly");
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogCategory $blogCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory): Response
    {
        return Inertia::render('Blog/Category/Form',[
            "title" => "Edit Blog Category",
            "category" => $blogCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogCategory $blogCategory)
    { 
        $validate = $request->validate([
            'title' => 'required|unique:blog_tags,title,'.$blogCategory->id,
            'content' => 'nullable'
        ]);

        $validate['title'] = Str::title($validate['title']);
        $validate['meta_title'] =$validate['title'];
        $validate['slug'] =Str::slug($validate['title']);

        $blogCategory->update($validate);
        return to_route('blog-categories.index')->withSuccess("Blog Category updated successfuly");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogCategory $blogCategory)
    {
        $blogCategory->delete();
        return redirect()->back()->withSuccess("Blog Category deleted successfuly");
    }
}
