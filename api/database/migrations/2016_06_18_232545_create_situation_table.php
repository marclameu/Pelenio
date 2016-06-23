<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSituationTable extends Migration
{
    public function up()
    {
        Schema::create('situations', function($table)
            {
                $table->increments('id');             
                $table->integer('user_id')->unsigned();
                $table->foreign('user_id')->
                    references('id')->
                    on('users')->
                    onDelete('cascade');             
                $table->date('dt_situation');
                $table->boolean('active');
                $table->timestamps();
            });
    }

    public function down()
    {
        Schema::drop('situations');
    }
}
