<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTotalColumnToSeasons extends Migration
{
        public function up()
    {
        Schema::table('seasons', function($table) {
            $table->decimal('total')->nullable();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('seasons', function($table) {
            $table->dropColumn('total');            
        });        
    }
}
