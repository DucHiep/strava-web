(function() {
    'use strict';

    angular
        .module('erpApp')
        .factory('Run', Run);

    User.$inject = ['$http', 'HOST_GW'];

    var service = {
        getRun: getRun,
    };

    return service;

    function getRun() {
        return $http.get(HOST_GW + '/api/v1/run').then(function (response) {
            return response;
        });
    }
})();