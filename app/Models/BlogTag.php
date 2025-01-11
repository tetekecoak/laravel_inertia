<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'meta_title',
        'slug',
        'content',
    ];

    public function posts()
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tags', 'blog_tag_id', 'blog_post_id');
    }
}
