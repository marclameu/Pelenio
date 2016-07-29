angular.module('pelenio').controller('fecharSeasonController', function($scope, seasonService, ngToast, $location, 
																		temporada, $uibModalInstance,
																		sharedPropertiesService){	
	$scope.fecharSeason = function(idTemporada, dataFimTemporada){		
		params = {};

		var dia = dataFimTemporada.substring(0,2);
		var mes = dataFimTemporada.substring(2,4);
		var ano = dataFimTemporada.substring(4,8);

		params.id 		= idTemporada;
		params.end 		= ano + '-' + mes + '-' + dia;		
		
		seasonService.fecharSeason(params).success(function(response){
			$uibModalInstance.close();
			ngToast.create(response.Mensagem);
			$location.path('temporada/listar');
		}).error(function(response){
			console.log('Erro => ' + response.Mensagem);
		});
	}

	$scope.temporada 		= temporada;
	if(($scope.temporada.end !== null) && ($scope.temporada.end !== undefined))
	{
		$scope.temporada.end	= sharedPropertiesService.formateDateFromServer($scope.temporada.end, '');
	}
});