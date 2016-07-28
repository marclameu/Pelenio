angular.module('pelenio').controller('newSeasonController', function($scope, seasonService, ngToast, $location){	
	$scope.salvarSeason = function(season){
		seasonService.salvarSeason(season).success(function(response){
			ngToast.create(response.Mensagem);
			$location.path('temporada/listar');
		}).error(function(response){
			$scope.mensagem = response.Mensagem;			
		});
	}	
});	