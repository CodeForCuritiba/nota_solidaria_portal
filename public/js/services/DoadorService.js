// public/js/services/DoadorService.js
angular.module('DoadorService', []).factory('Doador', ['$http', function($http) {

    return {
        // call to get all doadores
        get : function(id) {
            if (id) return $http.get('/api/doadores/' + id);
            else return $http.get('/api/doadores');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new doador
        create : function(doadorData) {
            return $http.post('/api/doadores', doadorData);
        },

        // set Nota.exportado as !Nota.exportado
        setNotaExportado: function(doador_id, nota_index) {
            return $http.put('/api/doadores/' + doador_id + '/' + nota_index)
        }
    }

}]);
