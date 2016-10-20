// public/js/controllers/DoadorCtrl.js
angular.module('DoadorCtrl', []).controller('DoadorController', ['$scope', 'Doador', '$sce', function($scope,Doador,$sce) {

    $scope.tagline = 'É fácil amar os que estão longe.<br/>Mas nem sempre é fácil amar os que vivem ao nosso lado.';

    Doador.get().then(function(response) {

    	$scope.notas = [];
    	$scope.doadores = response.data ? response.data : []; 

    	$scope.doadores.forEach(function(doador,key) {
    		if (doador.notas) {
    			for(var id in doador.notas) {
    				doador.notas[id].doador = doador;
				    $scope.notas.push(doador.notas[id]);
				}
    		}
    	});
    });

    $scope.nbNotas = function(doador) {
      return doador && doador.notas && Object.keys(doador.notas).length;
    }

    $scope.printDate = function(timestamp) {
    	var date = new Date(timestamp);

    	month = parseInt(date.getMonth() + 1, 10);
    	month = (month < 10) ? "0" + month : "" + month;

        var numberFixedLen = function(n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        }

    	return numberFixedLen(date.getDate(),2) + "/" + numberFixedLen(date.getMonth() + 1,2) + " ás " + 
                numberFixedLen(date.getHours(),2) + "h" + numberFixedLen(date.getMinutes(),2);
    }

	$scope.renderHtml = function(html_code)
	{
	    return $sce.trustAsHtml(html_code);
	}

}])

.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
});

