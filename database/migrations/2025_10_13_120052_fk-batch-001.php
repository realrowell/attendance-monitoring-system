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
        Schema::table('employees', function(Blueprint $table) {
            $table->foreign('dept_id')->references('id')->on('departments')->onDelete('set null');
            $table->foreign('emp_details_id')->references('id')->on('emp_details')->onDelete('cascade');
        });
        Schema::table('dependents', function(Blueprint $table) {
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
        });
        Schema::table('att_employees', function(Blueprint $table) {
            $table->foreign('emp_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('att_id')->references('id')->on('attendances')->onDelete('cascade');
        });
        Schema::table('att_dependents', function(Blueprint $table) {
            $table->foreign('depd_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('att_id')->references('id')->on('attendances')->onDelete('cascade');
        });
        Schema::table('attendances', function(Blueprint $table) {
            $table->foreign('activity_id')->references('id')->on('activities')->onDelete('cascade');
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
