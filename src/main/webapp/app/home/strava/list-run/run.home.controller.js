(function() {
    'use strict';
    angular.module('erpApp')
        .controller('RunHomeController', RunHomeController);

    RunHomeController.$inject = ['$rootScope','$scope', '$state','$stateParams','$http','$timeout','apiData', 'Run',
        'AlertService','$translate', 'variables', 'ErrorHandle', '$window','TableController'];
    function RunHomeController($rootScope,$scope, $state,$stateParams,$http,$timeout,apiData, Run,
                               AlertService,$translate, variables, ErrorHandle, $window,TableController){

        var loadFunction = Run.getRun ;
        // khai bao cac column va kieu du lieu
        var columns = {
            'name':'Text',
            'distance':'Number',
            "pace":'long',
            'date':'DateTime',
        };

        var tableConfig = {
            tableId: "running",               //table Id
            model: "running",                 //model
            loadFunction: loadFunction,     //api load du lieu
            columns: columns,               //bao gom cac cot nao
            handleAfterReload: null,        //xu ly sau khi load du lieu
            handleAfterReloadParams: null,  //tham so cho xu ly sau khi load
            deleteCallback: null,           //delete callback
            loading:false,
            customParams: null,               //dieu kien loc ban dau
            pager_id: "table_uom_pager",   //phan trang
            page_id: "uom_selectize_page", //phan trang
            page_number_id: "uom_selectize_pageNum",   //phan trang
            page_size_option: ["5", "10", "25", "50"]   //lua chon size cua 1 page
        };

        TableController.initTable($scope, tableConfig);     //khoi tao table
        TableController.sortDefault(tableConfig.tableId);   //set gia tri sap xep mac dinh
        TableController.reloadPage(tableConfig.tableId);

    }
})();