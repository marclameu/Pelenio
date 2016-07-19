<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDatePaymentColumnToExpenses extends Migration
{
    public function up()
    {
        Schema::table('expenses', function($table) {
            $table->date('date_payment')->nullable();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('expenses', function($table) {
            $table->date('date_payment');            
        });        
    }
}
