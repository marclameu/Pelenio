<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeasonUserTable extends Migration
{
    public function up()
    {
        Schema::create('season_user', function($table)
            {                    
                $table->date('date_payment')->nullable();;
                $table->decimal('payment')->nullable();;                
                $table->integer('season_id')->unsigned();               
                $table->foreign('season_id')
                        ->references('id')
                        ->on('seasons')
                        ->onDelete('cascade');
                $table->integer('user_id')->unsigned();               
                $table->foreign('user_id')
                        ->references('id')
                        ->on('users')
                        ->onDelete('cascade');                        
                $table->timestamps();
            });
    }

    public function down()
    {
        Schema::drop('season_user');
    }
}
