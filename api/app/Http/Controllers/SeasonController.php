<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Season;
use App\Match;

class SeasonController extends Controller
{
    protected $_season;
    
    public function __construct(Season $season){
        //$this->_season = new Season();
        $this->_season = $season;
        $this->middleware('jwt-auth', ['only' => 'store']);
    }

    public function index()
    {
        try {
             $seasons = $this->_season->getSeasons();
             return response()->json($seasons);
        } catch (Exception $e) {
             return response()->json(['Mensagem' => 'Erro ao processar requisição!'], 400);             
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $season = new Season();
            $season->fill($request->all());
            $this->_season->saveAndIncNumber($season);
            return response()->json(['Mensagem' => 'Registro cadastrado com sucesso!'], 202);   
        } catch (Exception $e) {
            return response()->json(['Mensagem' => 'Erro ao tentar criar registro!'], 400);   
        }        
    }

    public function show($id)
    {
        try {
            $season = $this->_season->getByIdWithMatches($id);
            if(empty($season) or ($season->count() <= 0)){
                return response()->json(["Mensagem" => "Temporada inexistente!"], 404);
            }
            return response()->json($season);
        } catch (Exception $e) {
            return response()->json(["Mensagem" => "Erro ao processar requisicao!"], 400);           
        }
    }

    public function adicionarPartida(Request $request){
        try {            
            $match = new Match();
            $match->date_match      = $request->input('date_match') ;
            $match->value           = $request->input('value') ;
            $match->income          = $request->input('income') ;
            $match->season_id       = $request->input('season_id') ;
            $match->payment_type    = $request->input('payment_type');
            $match->save();
            return response()->json(['Mensagem' => 'Registro cadastrado com sucesso!'], 202); 
            //return response()->json($match);
        } catch (Exception $e) {
            return response()->json(['Mensagem' => 'Erro ao tentar criar registro!' + $e], 400);             
        }
    }

    public function fechar(Request $request)
    {        
       $id      =  $request->input('id');
       $dataFim =  $request->input('end');        
       return response()->json($this->_season->fecharSeasonPorId($id, $dataFim));
    }
}
