<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPostMeta extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_post_id',
        'key',
        'content',
    ];

    public function blogPost()
    {
        return $this->belongsTo(BlogPost::class, 'blog_post_id');
    }
}
