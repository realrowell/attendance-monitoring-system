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
        Schema::create('activities', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('ref');
            $table->string('activity_type')->nullable();
            $table->string('activity_name');
            $table->string('activity_desc')->nullable();
            $table->dateTime('date_time');
            $table->string('activity_status')->default('drafted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
