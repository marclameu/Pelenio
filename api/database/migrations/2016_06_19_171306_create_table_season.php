<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSeason extends Migration
{
    public function up()
    {
        Schema::create('seasons', function($table)
            {
                $table->increments('id');             
                $table->string('description')->nullable();;
                $table->decimal('value')->nullable();;
                $table->boolean('actual')->nullable();;
                $table->integer('number')->nullable();;             
                $table->timestamps();
            });
    }

    public function down()
    {
        Schema::drop('seasons');
    }
}
