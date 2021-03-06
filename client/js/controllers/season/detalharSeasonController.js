angular.module('pelenio').controller('detalharSeasonController', function($scope, seasonService, userService, 
																		  matchService, ngDialog, ngToast,
																		  $timeout, $uibModal, $log, $routeParams,
																		  sharedPropertiesService){
	//$scope.temporada 			= temporada.data[0];	
	
	$scope.temporada 			= [];
	$scope.partidas	            = [];
	$scope.selecao 				= 'usuarios';
	$scope.canShowEmail 		= true;
	$scope.editandoPagamento	= [];
	$scope.payment 				= [];
	$scope.payment_type			= [];
	$scope.datePayment			= [];
	$scope.modoEdit 			= [];
	oldPaymentValues		 	= [];
	oldDatePaymentValues	 	= [];
	oldDatePaymentTypeValues 	= [];

	$scope.form = {};

	$scope.paymentTypes 		= [
		{type: "0", name: "Dinheiro"},
		{type: "1", name: "Cartão"}
	];

	var getTemporada = function(){
		seasonService.getSeason($routeParams.id).success(function(response){
			$scope.temporada = response[0];			
		}).error(function(response){			
		});
	}	


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
		//partida.payment_type = 	$scope.paymentTypes[0];
	}

	$scope.getTotalValue = function(matches){
		var values = 0;
		var incomes = 0;
		var result = [];
		if(matches){
			matches.forEach(function(m){
				values += parseInt(m.value);	
				incomes += parseInt(m.income);
			});
			result.push(values);
			result.push(incomes);	
		}	

		return result;
	}

	$scope.adicionarPartida = function(partida, seasonId){	
		partida.season_id = seasonId;			
		var dia = partida.date_match.substring(0,2);
		var mes = partida.date_match.substring(2,4);
		var ano = partida.date_match.substring(4,8);

		var partidaBackend 			= angular.copy(partida);
		partidaBackend.date_match 	= ano + '-' + mes + '-' + dia;
		partidaBackend.payment_type	= partida.payment_type.type;
		
		
		seasonService.criarPartida(partidaBackend).success(function(response){			
			seasonService.getSeason(seasonId).success(function(response2){
				$scope.temporada = response2[0];									
				
				$scope.novaPartidaHabilitada = false;
				carregarPartidas($scope.temporada.id);
				$scope.menssagem = 'Partida criada com sucesso!';				
				$timeout(function(){
        					$scope.menssagem = '';
        				}, 5000); 
			});			
		});
		
		partida.value = null;
		partida.income = null;
		partida.date_match = null;
		partida.payment_type = null;	

		$scope.form.formMatch.$setPristine();
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
			case 'pagamentos' :
				sharedPropertiesService.setSeasonId($scope.temporada.id);
				break;				
		}
	}

	var carregarPartidas = function(partidaId){
		$scope.menssagem = '';		
		matchService.getMatchsBySeasonId($scope.temporada.id).success(function(response){
			$scope.matches = response;	
			return response;		
		}).error(function(response){
			console.log('Erro encontrado => ' + response);			
		});		
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

	$scope.getTipoPagamento = function(tipo){
		/*if(isNaN(tipo)){
			return;
		}	*/	
		tipo = parseInt(tipo);	

		switch(tipo){
			case 0:
				return 'Dinheiro';
				break;
			case 1:
				return 'Cartão'
				break;			
		}

		return null;
	}

	var getNumeroTipoPagamento = function(tipo){
		switch(tipo){
			case 'Dinheiro':
				return 0;
				break;
			case 'Cartão':
				return 1
				break;
		}

		return null;
	}	

	var carregaInfoPagamentos = function(usuarios){		
		usuarios.forEach(function(usuario){
			if(usuario.seasons.length > 0){
				$scope.payment[usuario.id] 				= usuario.seasons[0].pivot.payment;
				$scope.datePayment[usuario.id]			= sharedPropertiesService.formateDateFromServer(usuario.seasons[0].pivot.date_payment, '/');								
				$scope.payment_type[usuario.id]			= $scope.getTipoPagamento(usuario.seasons[0].pivot.payment_type);
			}
			$scope.modoEdit[usuario.id] 	= false;			
		});		
	}

	var carregarUsuarios = function(partidaId){
		getTemporada();
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
		oldDatePaymentValues[idUsuario] 	= $scope.datePayment[idUsuario];
		oldDatePaymentTypeValues[idUsuario] = $scope.payment_type[idUsuario];	
		var index = ($scope.payment_type[idUsuario] == 'Dinheiro')?	0 : 1;
		$scope.payment_type[idUsuario] 		= $scope.paymentTypes[index];
		$scope.modoEdit[idUsuario] 			= true;				
	}

	$scope.salvarPagamento = function(idUsuario){				
		if(!confirm('Deseja salvar as alterações?'))
		{
			$scope.payment[idUsuario] 		= oldPaymentValues[idUsuario];			
			$scope.datePayment[idUsuario]	= oldDatePaymentValues[idUsuario];
			$scope.payment_type[idUsuario]	= oldDatePaymentTypeValues[idUsuario];
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

			params.payment_type = getNumeroTipoPagamento($scope.payment_type[idUsuario].name);
			
			console.log("id => " + idUsuario);
			userService.updateOrCreatePayment(idUsuario, params).success(function(response){
				ngToast.create('Informações de pagamento salvas com sucesso!');	
				$scope.payment_type[idUsuario] = $scope.payment_type[idUsuario].name;
			}).error(function(response){
				console.log('Não foi possível cadastrar o pagamento!');
			});
			
		}
		$scope.modoEdit[idUsuario] = false;	
	}


	$scope.delete = function (id) {	
		if(confirm('Deseja excluir a partida?')){
			matchService.deleteMatch(id).success(function(response){
				carregarPartidas($scope.temporada.id);
				$scope.menssagem = 'Partida excluída com sucesso!';
				$timeout(function(){
					$scope.menssagem = '';
				}, 5000);        				
			})		
		}
		//message = 'Deseja excluir o registro?';	
		/*	
     	ngDialog.openConfirm({         				
        			template: 'view/utils/popup.html',         				
        			className: 'ngdialog-theme-default',
        			data: message
        		}).then(function(conf){
        			matchService.deleteMatch(id).success(function(response){
        				carregarPartidas($scope.temporada.id);
        				$scope.menssagem = 'Partida excluída com sucesso!';
        				$timeout(function(){
        					$scope.menssagem = '';
        				}, 5000);        				
        			})		
        		});      
        */  
    };

    $scope.valorTotalUsuarios = function(usuarios){
    	valor = 0;
    	usuarios.forEach(function(usuario){
    		if(!isNaN(parseInt($scope.payment[usuario.id])))
    			valor += parseInt($scope.payment[usuario.id]);    		
    	});

    	return valor;
    }

    $scope.resumoFinanceiro = function(){   
    	
    	console.log(carregarPartidas($scope.temporada.id));
    	matchService.getMatchsBySeasonId($scope.temporada.id).success(function(response){
    		modalInstance = $uibModal.open({		      
			      templateUrl: 'resumoFinanceiro.html',
			      size: 'lg',
			      controller: 'resumoFinanceiroController',		      
			      resolve: {
			      	temporada: $scope.temporada,
			      	valorvalorTotalUsuarios: $scope.valorTotalUsuarios($scope.usuarios),
			      	valorTotalDiaristas: $scope.getTotalValue(response)[1] ,
			      	nome: function(){
			      		return "Marcelino Lameu da Silva";
			      	}
			      }			      
	    	});
	    	modalInstance.result.then(function () {      			
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
    	}).error(function(response){
    		console.log('Erro ao carregar valores - ' + response);
    	});
    }   

    $scope.abrirPopupFecharSeason = function(_temporada){
    	modalInstance = $uibModal.open({
    		templateUrl: 'view/seasons/tplFecharTemporada.html',
    		size: 'sm', 
    		controller: 'fecharSeasonController', 
    		resolve: {
    			temporada: _temporada
    		}
    	});

    	modalInstance.result.then(function(){

    	});
    }

	carregarUsuarios($routeParams.id);	
});