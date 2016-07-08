<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Match;

class MatchController extends Controller
{
    protected $_match;

    public function __construct(Match $match){
        $this->_match = $match;
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
        $match = Match::find($id);
        $match->delete();
        return response()->json(["Mensagem" => "Partida excluida com sucesso!"]);
    }
}
