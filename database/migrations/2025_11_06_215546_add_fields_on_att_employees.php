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
        Schema::table('att_employees', function (Blueprint $table) {
            // Add new columns
            $table->string('full_name')->after('is_present');
            $table->string('emp_class')->after('full_name');
            $table->string('department')->after('emp_class');
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
