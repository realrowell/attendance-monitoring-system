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
            // Drop existing foreign key first
            $table->dropForeign(['emp_id']);
            // Make column nullable if not already
            $table->string('emp_id')->nullable()->change();
            // Re-add with SET NULL
            $table->foreign('emp_id')->references('id')->on('employees')->nullOnDelete();
        });
        Schema::table('att_dependents', function (Blueprint $table) {
            // Drop existing foreign key first
            $table->dropForeign(['depd_id']);
            // Make column nullable if not already
            $table->string('depd_id')->nullable()->change();
            // Re-add with SET NULL
            $table->foreign('depd_id')->references('id')->on('dependents')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse changes on att_employees
        Schema::table('att_employees', function (Blueprint $table) {
            // Drop the modified foreign key
            $table->dropForeign(['emp_id']);

            // Revert column back to non-nullable (if original was non-nullable)
            $table->string('emp_id')->nullable(false)->change();

            // Re-add original foreign key behavior (adjust if you had different rules originally)
            $table->foreign('emp_id')
                ->references('id')
                ->on('employees')
                ->onDelete('cascade');
        });

        // Reverse changes on att_dependents
        Schema::table('att_dependents', function (Blueprint $table) {
            // Drop the modified foreign key
            $table->dropForeign(['depd_id']);

            // Revert column back to non-nullable
            $table->string('depd_id')->nullable(false)->change();

            // Restore original FK behavior (adjust if different)
            $table->foreign('depd_id')
                ->references('id')
                ->on('dependents')
                ->onDelete('cascade');
        });
    }
};
