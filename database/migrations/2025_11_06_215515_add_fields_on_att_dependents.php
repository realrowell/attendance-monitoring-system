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
        Schema::table('att_dependents', function (Blueprint $table) {
            // Add new columns
            $table->string('full_name')->after('is_present');
            $table->string('relation')->after('full_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('att_dependents', function (Blueprint $table) {
            $table->dropColumn(['full_name', 'relation']);
        });
    }
};
