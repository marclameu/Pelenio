angular.module('pelenio').controller('pagamentoSeasonModalInstanceController', function($scope, $uibModalInstance, season, expenseService){	
    $scope.season = season;
    $scope.salvarPagamento = function (pagamento) {
        var dia = pagamento.data_pagamento.substring(0,2);
      	var mes = pagamento.data_pagamento.substring(2,4);
      	var ano = pagamento.data_pagamento.substring(4,8);

      	pagamento.data_pagamento = ano + '-' + mes + '-' + dia;
      	pagamento.season_id = $scope.season.id;

      	expenseService.salvarPagamento(pagamento).success(function(response){		
      		$uibModalInstance.close('Pagamento criado com sucesso!');
      	});      
    };

    $scope.cancel = function (form) {
    	form.$invalid = false;
      $uibModalInstance.dismiss('cancel');
    };	
});	