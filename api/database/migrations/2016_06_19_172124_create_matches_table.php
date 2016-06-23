<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMatchesTable extends Migration
{
    public function up()
    {
        Schema::create('matches', function($table)
            {
                $table->increments('id');             
                $table->date('date_match')->nullable();;
                $table->decimal('income')->nullable();;
                $table->decimal('value')->nullable();; 
                $table->integer('season_id')->unsigned()->nullable();;               
                $table->foreign('season_id')
                        ->references('id')
                        ->on('seasons')
                        ->onDelete('cascade');
                $table->timestamps();
            });
    }

    public function down()
    {
        Schema::drop('matches');
    }
}
