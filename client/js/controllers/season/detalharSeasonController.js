angular.module('pelenio').controller('detalharSeasonController', function($scope, seasonService, userService, matchService, temporada, ngDialog){
	$scope.temporada 			= temporada.data[0];	
	$scope.partidas	            = [];
	$scope.selecao 				= 'usuarios';
	$scope.canShowEmail 		= true;
	$scope.editandoPagamento	= [];
	$scope.payment 				= [];
	$scope.datePayment			= [];
	$scope.modoEdit 			= [];
	oldPaymentValues		 	= [];
	oldDatePaymentValues	 	= [];


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
				carregarPartidas($scope.temporada.id);
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
		$scope.menssagem = '';
		matchService.getMatchsBySeasonId($scope.temporada.id).success(function(response){
			$scope.matches = response;			
		}).error(function(response){
			console.log('Erro encontrado => ' + response);			
		});		
	}

	$scope.formateDateFromServer = function(strDate, separator){
		d = strDate.split('-');
		return d[2] + separator + d[1] + separator + d[0];
	}

	$scope.formateDateToView = function(strDate, separator){
		if(strDate === undefined)
			return '';

		if(strDate.indexOf('/') < 0){
			d = strDate.substring(0,2) + separator;
			d += strDate.substring(2, 4) + separator;
			d += strDate.substring(4, 8);
			return d;
		}

		return strDate;
	}

	var carregaInfoPagamentos = function(usuarios){		
		usuarios.forEach(function(usuario){
			if(usuario.seasons.length > 0){
				$scope.payment[usuario.id] 		= usuario.seasons[0].pivot.payment;
				$scope.datePayment[usuario.id]	= $scope.formateDateFromServer(usuario.seasons[0].pivot.date_payment, '/');								
			}
			$scope.modoEdit[usuario.id] 	= false;			
		});		
	}

	var carregarUsuarios = function(partidaId){
		userService.getUsersBySeasonId(partidaId).success(function(response){
			$scope.usuarios = response;
			carregaInfoPagamentos($scope.usuarios);
		}).error(function(response){
			console.log('Erro ao carregar usuarios => ' + response);
		});	
		$scope.showEmail();	
	}

	$scope.modoEdicaoPagamento = function(idUsuario, seasonId){
		$scope.editandoPagamento[idUsuario] = !$scope.editandoPagamento[idUsuario];
		oldPaymentValues[idUsuario] 		= $scope.payment[idUsuario];		
		oldDatePaymentValues[idUsuario] 	= $scope.datePayment[idUsuario]
		$scope.modoEdit[idUsuario] 			= true;				
	}

	$scope.salvarPagamento = function(idUsuario){				
		if(!confirm('Deseja salvar as alterações?'))
		{
			$scope.payment[idUsuario] 		= oldPaymentValues[idUsuario];			
			$scope.datePayment[idUsuario]	= oldDatePaymentValues[idUsuario];
		}
		else{
			params = {};				
			params.seasonId 	= $scope.temporada.id;
			params.payment  	= $scope.payment[idUsuario];
			params.datePayment 	= $scope.datePayment[idUsuario].replace('/', '').replace('/', '');	

			dia = params.datePayment.substring(0,2);
			mes = params.datePayment.substring(2,4);
			ano = params.datePayment.substring(4,8);		
			
			params.datePayment = ano + '-' + mes + '-' + dia;
			

			userService.updateOrCreatePayment(idUsuario, params).success(function(response){
		
			}).error(function(response){
				console.log('Não foi possível cadastrar o pagamento!');
			});
		}
		$scope.modoEdit[idUsuario] = false;	
	}


	$scope.delete = function (id) {	
		message = 'Deseja excluir o registro?';		
     	ngDialog.openConfirm({         				
        			template: 'view/utils/popup.html',         				
        			className: 'ngdialog-theme-default',
        			data: message
        		}).then(function(conf){
        			matchService.deleteMatch(id).success(function(response){
        				carregarPartidas($scope.temporada.id);
        				$scope.menssagem = 'Partida excluída com sucesso!';
        			})		
        		});        
    };

	carregarUsuarios($scope.temporada.id);		
});