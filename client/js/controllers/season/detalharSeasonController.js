angular.module('pelenio').controller('detalharSeasonController', function($scope, seasonService, temporada){
	$scope.temporada = temporada.data[0];
	console.log($scope.temporada[0]);

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

		console.log(result);
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
});