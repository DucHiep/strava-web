(function () {
    'use strict';
    angular.module('erpApp').controller('AutomaticController', AutomaticController);

    AutomaticController.$inject = ['$rootScope', '$scope', '$state', 'ErrorHandle',
        'AlertService', '$translate', 'TableController', 'ComboBoxController', 'AlertModalService', 'AutomaticControl', '$window'];

    function AutomaticController($rootScope, $scope, $state, ErrorHandle,
                                  AlertService, $translate, TableController, ComboBoxController, AlertModalService, AutomaticControl, $window) {
        $scope.tenantId = $window.localStorage.getItem("farmId") ? $window.localStorage.getItem("farmId") : 0;
        $scope.ComboBox = {};

        // khai bao cac column va kieu du lieu
        var columns = {
            'id':'Number',
            'serial':'Text',
            'name':'Text',
            'code':'Text',
            'type':'Number',
            'tenantId':'Number',
            'areaId':'Number',
            'typeFarm':'Number',
            'gw':'Text',
            'state':'Number',
            'gatewayId':'Number',
            'groupDeviceId': 'Number',
            'productName': 'Text',
            'seasonName': 'Text',
            'areaName': 'Text'
        };

        // khai bao cau hinh cho bang
        var tableConfig = {
            tableId: "automaticControls",               //table Id
            model: "automaticControls",                 //model
            defaultSort:"created",          //sap xep mac dinh theo cot nao
            sortType: "desc",                //kieu sap xep
            loadFunction: AutomaticControl.getPage,     //api load du lieu
            columns: columns,               //bao gom cac cot nao
            handleAfterReload: null,        //xu ly sau khi load du lieu
            handleAfterReloadParams: null,  //tham so cho xu ly sau khi load
            deleteCallback: null,           //delete callback
            customParams: "tenantId==" + $scope.tenantId,               //dieu kien loc ban dau
            pager_id: "table_device_pager",   //phan trang
            page_id: "device_selectize_page", //phan trang
            page_number_id: "device_selectize_pageNum",   //phan trang
            page_size_option: ["5", "10", "25", "50"]   //lua chon size cua 1 page
        };

        TableController.initTable($scope, tableConfig);     //khoi tao table
        TableController.sortDefault(tableConfig.tableId);   //set gia tri sap xep mac dinh
        TableController.reloadPage(tableConfig.tableId);    //load du lieu cho table

        $scope.typeFields = [
            { value: 0, title: 'Ch??a k??ch ho???t'},
            { value: 1, title: 'K??ch ho???t'}
        ];

        $scope.typeOptions = [
            '',
            'Tr???n dinh d?????ng theo EC v?? pH',
            'Tr???n dinh d?????ng theo EC',
            'Tr???n dinh d?????ng theo ?????nh l?????ng',
            'Tr???n dinh d?????ng theo ?????nh l?????ng v?? pH',
            'B??m dinh d?????ng cho gi?? th???/?????t',
            'B??m dinh d?????ng cho thu??? canh',
            'Qu???t gi??',
            'C???t n???ng',
            'Chi???u s??ng'
        ];

        var typeOptions = [
            { id: 1, name: 'Tr???n dinh d?????ng theo EC v?? pH'},
            { id: 2, name: 'Tr???n dinh d?????ng theo EC'},
            { id: 3, name: 'Tr???n dinh d?????ng theo ?????nh l?????ng'},
            { id: 4, name: 'Tr???n dinh d?????ng theo ?????nh l?????ng v?? pH'},
            { id: 5, name: 'B??m dinh d?????ng cho gi?? th???/?????t'},
            { id: 6, name: 'B??m dinh d?????ng cho thu??? canh'},
            { id: 7, name: 'Qu???t gi??'},
            { id: 8, name: 'C???t n???ng'},
            { id: 9, name: 'Chi???u s??ng'}
        ];
        // type combobox
        var typeCbb = {
            id: 'typeCbb',
            url: '',
            originParams: '',
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            table: $scope.TABLES['automaticControls'],
            column: 'type',
            maxItems: 1,
            ngModel: [],
            options: typeOptions,
            placeholder: 'Ch???n ch??? ?????'
        };
        ComboBoxController.init($scope, typeCbb);

        // ham xoa mac dinh
        $scope.defaultDelete = function () {
            TableController.defaultDelete(tableConfig.tableId, AutomaticControl.deleteRecord);
        };

        $scope.deleteOne = function(id){
            UIkit.modal.confirm($translate.instant("global.actionConfirm.delete"), function () {
                AutomaticControl.deleteOne(id).then(function () {
                    AlertService.success("success.msg.delete");
                    TableController.reloadPage(tableConfig.tableId);
                }).catch(function(data){
                    ErrorHandle.handleOneError(data);
                })
            }, {
                labels: {
                    'Ok': $translate.instant("global.button.delete"),
                    'Cancel': $translate.instant("global.button.cancel2")
                }
            });
        }
    }
})();
