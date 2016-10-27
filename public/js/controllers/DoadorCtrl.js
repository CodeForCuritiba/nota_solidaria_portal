// public/js/controllers/DoadorCtrl.js
angular.module('DoadorCtrl', ['ngclipboard']).controller('DoadorController', ['$scope', 'Doador', '$sce', function($scope,Doador,$sce) {

    $scope.tagline = 'É fácil amar os que estão longe.<br/>Mas nem sempre é fácil amar os que vivem ao nosso lado.';
    $scope.date1 = "";
    $scope.date2 = "";

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

    $('#date1-calendar').datetimepicker({
        format: 'D/MM/YYYY'
    });
    $('#date2-calendar').datetimepicker({
        format: 'D/MM/YYYY'
    });
    $scope.date1 = "";
    $("#date1-calendar").on("dp.change", function() { //have to do this cause ng-model does not bind with bootstrap-calendar
        $scope.date1 = $("#date1").val();
    });
    $scope.date2 = "";
    $("#date2-calendar").on("dp.change", function() {
        $scope.date2 = $("#date2").val();
    });

    $scope.findNotasByDate = function() { //no api calls
        var date1, date2, values, res;
        if($scope.date1 == "") {
            date1 = new Date("01 01 1970"); //get first date
        } else {
            // have to change from DD/MM/YYYY to MM/DD/YYYY to create Date object
            values = $scope.date1.split("/");
            res = values[1] + " " + values[0] + " " + values[2];
            date1 = new Date(res);
            console.log(res);
        }

        if($scope.date2 == "") {
            date2 = new Date(); //get current date
        } else {
            values = $scope.date2.split("/");
            res = values[1] + " " + values[0] + " " + values[2];
            date2 = new Date(res);
            console.log(res);
        }

        console.log(date1);
        console.log(date2);
        $scope.notas = [];

       $scope.doadores.forEach(function(doador,key) {
            if (doador.notas) {
                for(var id in doador.notas) {
                    if(doador.notas[id].donated_at > date1.getTime() && doador.notas[id].donated_at < date2.getTime()) {
                        doador.notas[id].doador = doador;
                        $scope.notas.push(doador.notas[id]);
                    }
                }
            }
        });
    }

    $scope.setNotaExportado = function(doador_id, nota_index) {
        $scope.notas[nota_index].exportado = !$scope.notas[nota_index].exportado;
        return Doador.setNotaExportado(doador_id, nota_index);
    }

    $scope.setColorExportado = function(nota) {
        if (nota.exportado) {
            return { color: "gray" }
        }
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