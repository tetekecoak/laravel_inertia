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
        Schema::create('iot_devices', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->float("temprature")->nullable();
            $table->float("humadity")->nullable();
            $table->float("raindrops")->nullable();
            $table->float("soil_moisture")->nullable();
            $table->boolean("is_automatic_pump")->nullable();
            $table->boolean("is_waterpump")->nullable();
            $table->timestamps();
            
        });

        Schema::create('gardens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('garden_iot_devices', function (Blueprint $table) {
            $table->foreignId('garden_id')->constrained('gardens')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL
            $table->foreignId('iot_device_id')->constrained('iot_devices')->onDelete('restrict')->onUpdate('cascade'); // BIGINT NOT NULL

            $table->primary(['garden_id', 'iot_device_id']); // Composite primary key
            $table->index('iot_device_id', 'idx_pc_category'); // Index for categoryId
            $table->index('garden_id', 'idx_pc_post'); // Index for postId
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('iot_devices');
        Schema::dropIfExists('gardens');
        Schema::dropIfExists('garden_iot_devices');
        
    }
};
