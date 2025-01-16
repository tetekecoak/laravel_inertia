<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'parent_id',
        'title',
        'meta_title',
        'slug',
        'summary',
        'published',
        'published_at',
        'content',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function parent()
    {
        return $this->belongsTo(BlogPost::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(BlogPost::class, 'parent_id');
    }

    public function categories()
    {
        return $this->belongsToMany(BlogCategory::class, 'blog_post_category', 'blog_post_id', 'blog_category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tags', 'blog_post_id', 'blog_tag_id');
    }

    public function metas()
    {
        return $this->hasMany(BlogPostMeta::class, 'blog_post_id');
    }
}
