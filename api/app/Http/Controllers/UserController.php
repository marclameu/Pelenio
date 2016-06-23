<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;

use App\Situation;

class UserController extends Controller
{ 

    public function __construct()
    {        
        //$this->middleware('jwt-auth', ['except' => 'index']);        
         //$this->middleware('jwt-auth');  
         $this->_user = new User();      
    }

    public function index()
    {
        //$usuarios = User::all();
        $usuarios = $this->_user->getUsers();
        return response()->json($usuarios);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        //Criar usuario
        $usuario = new User();
        $usuario->name = $request->input('name');
        $usuario->email = $request->input('email');
        $usuario->password = \Hash::make($request->input('password'));
        $usuario->save();

        //criar nova situação.
        $situacao = new Situation();
        $situacao->dt_situation = (new \DateTime())->format('Y-m-d H:i:s');
        $situacao->active = true;

        $usuario->situations()->save($situacao);

        return response()->json(["Mensagem" => "Usuario cadastrado com sucesso!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {

            $user = $this->_user->getByIdWithSituations($id);               

            if(empty($user) or ($user->count() <= 0))
            {
                return response()->json(["Mensagem" => "Usuario inexistente!"], 404);
            }

            return response()->json($user);
            
        } catch (Exception $e) {
            return response()->json(["Mensagem" => "Erro ao processar requisicao!"], 400);
        }       

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
