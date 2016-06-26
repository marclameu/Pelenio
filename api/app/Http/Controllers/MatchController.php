<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Match;

class MatchController extends Controller
{
    public function __construct(){
        $this->_match = new Match();
    }

    public function index()
    {        
    }

    public function getMatchBySeasonId($seasonId)
    {
        return $this->_match->getySeasonId($seasonId);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
