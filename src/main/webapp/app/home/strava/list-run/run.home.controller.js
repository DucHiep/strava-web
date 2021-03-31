(function() {
    'use strict';
    debugger
    angular.module('erpApp')
        .controller('MovieHomeController', RunHomeController);

    RunHomeController.$inject = ['$scope'];
    function RunHomeController($rootScope,$scope, $state,$stateParams,$http,$timeout,apiData, Run,
                               AlertService,$translate, variables, ErrorHandle, $window,TableController){

        var loadFunction = Run.getRun ;
        // khai bao cac column va kieu du lieu
        var columns = {
            'name':'Text',
            'distance':'Number',
            "pace":'Number',
            'date':'DateTime',
        };

        var tableConfig = {
            tableId: "runs",               //table Id
            model: "runs",                 //model
            loadFunction: loadFunction,     //api load du lieu
            columns: columns,               //bao gom cac cot nao
            handleAfterReload: null,        //xu ly sau khi load du lieu
            handleAfterReloadParams: null,  //tham so cho xu ly sau khi load
            deleteCallback: null,           //delete callback
            loading:false
        };

        TableController.initTable($scope, tableConfig);     //khoi tao table
        TableController.sortDefault(tableConfig.tableId);   //set gia tri sap xep mac dinh
        TableController.reloadPage(tableConfig.tableId);

    }
})();