<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade'); // BIGINT NOT NULL
            $table->foreignId('parent_id')->nullable()->constrained('blog_posts')->onDelete('set null'); // BIGINT NULL
            $table->string('title', 75); // VARCHAR(75) NOT NULL
            $table->string('meta_title', 100)->nullable(); // VARCHAR(100) NULL
            $table->string('slug', 100)->unique(); // VARCHAR(100) NOT NULL, UNIQUE
            $table->tinyText('summary')->nullable(); // TINYTEXT NULL
            $table->boolean('published')->default(false); // TINYINT(1) NOT NULL DEFAULT 0
            $table->timestamp('created_at')->useCurrent(); // DATETIME NOT NULL
            $table->timestamp('updated_at')->nullable(); // DATETIME NULL
            $table->timestamp('published_at')->nullable(); // DATETIME NULL
            $table->text('content')->nullable(); // TEXT NULL

            $table->index(['author_id', 'slug']); // Optional index for performance
        });

        Schema::create('blog_post_metas', function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->foreignId('blog_post_id')->constrained('blog_posts')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL
            $table->string('key', 50); // VARCHAR(50) NOT NULL
            $table->text('content')->nullable(); // TEXT NULL DEFAULT NULL

            $table->unique(['blog_post_id', 'key'], 'uq_post_meta'); // UNIQUE INDEX on postId and key
            $table->index('blog_post_id', 'idx_meta_post'); // INDEX for postId
        });

        Schema::create("blog_categories", function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->foreignId('parent_id')->nullable()->constrained('blog_categories')->nullOnDelete(); // BIGINT NULL, FOREIGN KEY
            $table->string('title', 75); // VARCHAR(75) NOT NULL
            $table->string('meta_title', 100)->nullable(); // VARCHAR(100) NULL
            $table->string('slug', 100)->unique(); // VARCHAR(100) NOT NULL, UNIQUE
            $table->text('content')->nullable(); // TEXT NULL
            $table->timestamps(); // Created_at and updated_at timestamps

            $table->index('parent_id', 'idx_category_parent'); // Add index for parentId
        });


        Schema::create('blog_post_category', function (Blueprint $table) {
            $table->foreignId('blog_post_id')->constrained('blog_posts')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL
            $table->foreignId('blog_category_id')->constrained('blog_categories')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL

            $table->primary(['blog_post_id', 'blog_category_id']); // Composite primary key
            $table->index('blog_category_id', 'idx_pc_category'); // Index for categoryId
            $table->index('blog_post_id', 'idx_pc_post'); // Index for postId
        });

        Schema::create("blog_tags", function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->string('title', 75); // VARCHAR(75) NOT NULL
            $table->string('meta_title', 100)->nullable(); // VARCHAR(100) NULL
            $table->string('slug', 100)->unique(); // VARCHAR(100) NOT NULL, UNIQUE
            $table->text('content')->nullable(); // TEXT NULL
            $table->timestamps(); // Created_at and updated_at timestamps
        });


        Schema::create('blog_post_tags', function (Blueprint $table) {
            $table->foreignId('blog_post_id')->constrained('blog_posts')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL
            $table->foreignId('blog_tag_id')->constrained('blog_tags')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL

            $table->primary(['blog_post_id', 'blog_tag_id']); // Composite primary key
            $table->index('blog_tag_id', 'idx_pc_category'); // Index for categoryId
            $table->index('blog_post_id', 'idx_pc_post'); // Index for postId
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
