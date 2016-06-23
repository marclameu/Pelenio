<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Season;

class SeasonController extends Controller
{

    public function index()
    {
        try {
             $sessions = Season::all();
             return response()->json($sessions);
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
            //$season->start = new DateTime($request->input('start'));
            //dd($season);
            $season->save();
            return response()->json(['Mensagem' => 'Registro cadastrado com sucesso!'], 202);   
        } catch (Exception $e) {
            return response()->json(['Mensagem' => 'Erro ao tentar criar registro!'], 400);   
        }        
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
