<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPaymentTypeColumnToSeasonUser extends Migration
{
    public function up()
    {
        /*
        0 - Dinheiro
        1 - Cartão
        */
        Schema::table('season_user', function($table) {
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
        Schema::table('season_user', function($table) {
            $table->dropColumn('payment_type');            
        });
    }
}
