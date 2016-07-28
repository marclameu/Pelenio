angular.module('pelenio').controller('pagamentoSeasonController', function($scope, expenseService, sharedPropertiesService, 
																		   $uibModal, $log, ngToast){
//	console.log(sharedPropertiesService.getSeasonId());
	var seasonId = sharedPropertiesService.getSeasonId();
	$scope.payments = [];
	
	$scope.getExpensesBySeasonId = function (id){
		expenseService.getExpensesBySeasonId(seasonId).success(function(response){
			$scope.payments	 = response;			
		});
	}

	$scope.totalExpenses = function(payments){
		var total = 0;
		payments.forEach(function(p){
			total += parseFloat(p.value);
		});

		return total;
	}

	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

	$scope.abrirNovoPagamentoForm = function(){
	    modalInstance = $uibModal.open({		      
		      templateUrl: 'view/seasons/tplNovoPagamento.html',
		      size: 'lg',		      
		      controller: 'pagamentoSeasonModalInstanceController',		      
		      resolve: {
		      	season: $scope.temporada,
		      }			      
		});
		modalInstance.result.then(function (msg) { 
			$scope.getExpensesBySeasonId(seasonId);
			ngToast.create(msg);
	    }, function () {
	    	console.log('cancelou...');
	    });
	}

	$scope.delete = function(id){
		if(confirm('Deseja excluir o pagamento?')){
			expenseService.deletarPagamento(id).success(function(response){
				ngToast.create(response.Mensagem);
				$scope.getExpensesBySeasonId(seasonId)
			}).error(function(response){
				console.log(response.Mensagem);
			});			
		}
	}

	$scope.getExpensesBySeasonId(seasonId)
});


//tplNovoPagamento.html