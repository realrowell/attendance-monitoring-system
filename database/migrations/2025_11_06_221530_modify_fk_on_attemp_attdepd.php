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
        Schema::table('att_employees', function(Blueprint $table) {
            // Drop existing foreign key first
            $table->dropForeign(['emp_id']);
            // Make column nullable if not already
            $table->string('emp_id')->nullable()->change();
            // Re-add with SET NULL
            $table->foreign('emp_id')->references('id')->on('employees')->nullOnDelete();
        });
        Schema::table('att_dependents', function(Blueprint $table) {
            // Drop existing foreign key first
            $table->dropForeign(['depd_id']);
            // Make column nullable if not already
            $table->string('depd_id')->nullable()->change();
            // Re-add with SET NULL
            $table->foreign('depd_id')->references('id')->on('employees')->nullOnDelete();
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
