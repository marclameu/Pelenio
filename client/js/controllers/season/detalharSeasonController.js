angular.module('pelenio').controller('detalharSeasonController', function($scope, seasonService, userService, matchService, temporada){
	$scope.temporada = temporada.data[0];		
	$scope.selecao = 'usuarios';
	$scope.canShowEmail = true;
	$scope.editandoPagamento = [];
	$scope.payment 			 = [];
	$scope.modoEdit 		 = [];
	
	$scope.showEmail = function(){
		$scope.canShowEmail = true;
		$scope.startFade = false;
	}

	$scope.hideEmail = function(){
		$scope.startFade = true;
		$scope.canShowEmail = false;		
	}

	$scope.habilitaAdicionarPartida = function(){
		$scope.novaPartidaHabilitada = !$scope.novaPartidaHabilitada;
	}

	$scope.getTotalValue = function(matches){
		var values = 0;
		var incomes = 0;
		var result = [];
		matches.forEach(function(m){
			values += parseInt(m.value);	
			incomes += parseInt(m.income);
		});
		result.push(values);
		result.push(incomes);

		//console.log(result);
		return result;
	}

	$scope.adicionarPartida = function(partida, seasonId){	
		partida.season_id = seasonId;			
		var dia = partida.date_match.substring(0,2);
		var mes = partida.date_match.substring(2,4);
		var ano = partida.date_match.substring(4,8);				
		
		var partidaBackend = angular.copy(partida);
		partidaBackend.date_match = ano + '-' + mes + '-' + dia;		
		
		
		seasonService.criarPartida(partidaBackend).success(function(response){			
			seasonService.getSeason(seasonId).success(function(response2){
				$scope.temporada = response2[0];
				console.log(response2[0]);
				delete $scope.partida;
				$scope.novaPartidaHabilitada = false;
				$scope.menssagem = 'Partida criada com sucesso!';
			});
		});
	}

	$scope.setSelecao = function(selecionado){
		$scope.selecao = selecionado;	
		switch(selecionado)	{
			case 'partidas' : 
				carregarPartidas($scope.temporada.id);
				break;
			case 'usuarios' :
				carregarUsuarios($scope.temporada.id);
				break;
		}
	}

	var carregarPartidas = function(partidaId){
		matchService.getMatchsBySeasonId($scope.temporada.id).success(function(response){
			$scope.matches = response;
			console.log(response);
		}).error(function(response){
			console.log('Erro encontrado => ' + response);			
		});
	}

	var carregarUsuarios = function(partidaId){
		userService.getUsersBySeasonId(partidaId).success(function(response){
			$scope.usuarios = response;
		}).error(function(response){
			console.log('Erro ao carregar usuarios => ' + response);
		});	
		$scope.showEmail();	
	}

	$scope.modoEdicaoPagamento = function(idUsuario, seasonId, payment){
		$scope.editandoPagamento[idUsuario] = !$scope.editandoPagamento[idUsuario];
		$scope.payment[idUsuario] = payment;
		$scope.modoEdit[idUsuario] = true;				
	}

	carregarUsuarios($scope.temporada.id);	
});