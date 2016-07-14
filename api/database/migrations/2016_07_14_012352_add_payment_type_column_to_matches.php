<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPaymentTypeColumnToMatches extends Migration
{
    public function up()
    {
        /*
        0 - Dinheiro
        1 - Cartão
        */
        Schema::table('matches', function($table) {
            $table->integer('payment_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('matches', function($table) {
            $table->dropColumn('payment_type');            
        });        
    }
}
