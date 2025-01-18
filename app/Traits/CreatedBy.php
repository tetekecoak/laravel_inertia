<?php

namespace App\Traits;
use Auth;

trait CreatedBy
{
    protected static function bootCreatedBy()
    {
        static::creating(function ($model) {
            // Set the created_by field to the currently authenticated user
            if (Auth::check()) {
                $model->created_by = Auth::id();
            }
        });
    }

    /**
     * Define a relationship with the User model for the created_by column.
     */
    public function creator()
    {
        return $this->belongsTo(\App\Models\User::class, 'created_by');
    }
}
