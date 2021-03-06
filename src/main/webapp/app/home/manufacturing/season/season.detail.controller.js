(function () {
    'use strict';
    angular.module('erpApp')
        .controller('SeasonDetailController', SeasonDetailController);

    SeasonDetailController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AlertService','$window',
        '$translate', 'ErrorHandle', 'ComboBoxController', 'TableController', '$timeout',
        'Season', 'Phase'];

    function SeasonDetailController($rootScope, $scope, $state, $stateParams, AlertService,$window,
                                    $translate, ErrorHandle, ComboBoxController, TableController, $timeout,
                                    Season, Phase) {
        $scope.ComboBox = {};
        $scope.season = {};
        $scope.farmId = $window.localStorage.getItem("farmId")
        $scope.farmName = $window.localStorage.getItem("farmName")
        $scope.statusOptions = [
            { value: 0, title: $translate.instant("admin.season.pending") },
            { value: 1, title: $translate.instant("admin.season.processing") },
            { value: 2, title: $translate.instant("admin.season.finished") }
        ];

        $scope.msg = {
            required_msg : $translate.instant('admin.messages.required'),
            gln_msg : $translate.instant('global.messages.number_msg'),
            maxLength12 : $translate.instant('global.messages.maxLength12'),
            maxLength20 : $translate.instant('global.messages.maxLength20'),
            maxLength255 : $translate.instant('global.messages.maxLength255')
        };

        $scope.blockModal = null;
        $scope.blockUI = function () {
            if($scope.blockModal != null)
                $scope.blockModal.hide();
            $scope.blockModal = null;
            $scope.blockModal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>Please Wait...<br/><img class=\'uk-margin-top\' src=\'assets/img/spinners/spinner_success.gif\' alt=\'\'>');
        };

        Season.getFull($stateParams.seasonId).then(function(data){
            $scope.season = data;

        }).catch(function (err) {
            ErrorHandle.handleError(err);
        });

        // ====================================================
        // config for procedure table

        //config for phases table
        var phasesColumns = {
            'name': 'Text',
            'description':'Text'
        };
        // khai bao cau hinh cho bang
        var tablePhaseConfig = {
            tableId: "phases",            //table Id
            model: "phases",             //model
            defaultSort:"created",          //sap xep mac dinh theo cot nao
            sortType: "asc",                //kieu sap xep
            loadFunction: Phase.getPage,     //api load du lieu
            columns: phasesColumns,               //bao gom cac cot nao
            handleAfterReload: null,        //xu ly sau khi load du lieu
            handleAfterReloadParams: null,  //tham so cho xu ly sau khi load
            deleteCallback: null,           //delete callback
            customParams: "seasonId==" + $stateParams.seasonId,               //dieu kien loc ban dau
            pager_id: "table_phase_pager",   //phan trang
            page_id: "phase_selectize_page", //phan trang
            page_number_id: "phase_selectize_pageNum",   //phan trang
            page_size_option: ["5", "10", "25", "50"]   //lua chon size cua 1 page
        };

        TableController.initTable($scope, tablePhaseConfig);     //khoi tao table
        TableController.sortDefault(tablePhaseConfig.tableId);   //set gia tri sap xep mac dinh
        TableController.reloadPage(tablePhaseConfig.tableId);    //load du lieu cho table

        //================ PHASE ===================
        $scope.showEditPhaseBtn = false;
        $scope.showPhaseForm = function () {
            resetFormPhase();
            $scope.showEditPhaseBtn = true;
        }

        $scope.closePhaseForm = function() {
            resetFormPhase();
            $scope.showEditPhaseBtn = false;
        }

        // form phase
        $scope.showAddPhase = false;
        $scope.editPhasePosition = null;
        // show add column
        $scope.addNewPhase = function () {
            $scope.showAddPhase = true;
            $scope.showEditPhase = false;
            $scope.editPhasePosition = null;
        };
        // click add item
        $scope.saveItemPhase = function () {
            var stageName = $("#stageName").parsley();
            var stageDes = $("#stageDes").parsley();

            if (!stageName.isValid() || !stageDes.isValid()) {
                return;
            }

            if (!checkExitsPhase()) {
                $scope.newItemPhase.active = 1;
                $scope.newItemPhase.tenantId = $scope.farmId;
                // $scope.phases.push($scope.newItemPhase);
                // th??m m???i giai ??o???n th???c hi???n
                UIkit.modal.confirm("B???n mu???n th??m m???i giai ??o???n th???c hi???n?", function () {
                    $scope.newItemPhase.seasonId = $stateParams.seasonId;
                    $scope.newItemPhase.organizationId = $scope.season.organizationId;

                    Phase.create($scope.newItemPhase).then(function () {
                        AlertService.success("Th??m m???i giai ??o???n th???c hi???n th??nh c??ng");

                        TableController.reloadPage(tablePhaseConfig.tableId);
                        resetFormPhase();
                    }).catch(function (err) {
                        ErrorHandle.handleOneError(err);
                    });
                }, {
                    labels: {
                        'Ok': $translate.instant("global.button.ok"),
                        'Cancel': $translate.instant("global.button.cancel")
                    }
                });
            } else {
                AlertService.error("Giai ??o???n th???c hi???n n??y ???? t???n t???i");
            }
        };

        $scope.editPhase = function (index) {
            $scope.showAddPhase = false;
            $scope.showEditPhase = true;
            $scope.editPhasePosition = index;

            var newItemPhase = angular.copy($scope.phases[index]);
            $scope.newItemPhase = newItemPhase;
        };

        // save item v???a s???a
        $scope.savePhaseEdit = function ($event, index) {
            var $element = $event.target;
            var tr = $($element).closest('tr');
            // check valid form
            if(!ComboBoxController.checkIsValidForm(tr)) return;

            // var editPhaseName = $("#editPhaseName");
            // var editPhaseDes = $("#editPhaseDes");
            //
            // if (!editPhaseName.parsley().isValid() || !editPhaseDes.parsley().isValid()) return;

            if (!checkExitsPhase(index)) {
                UIkit.modal.confirm("B???n mu???n s???a giai ??o???n th???c hi???n?", function () {
                    $scope.phases[index].name = $scope.newItemPhase.name;
                    $scope.phases[index].description = $scope.newItemPhase.description;

                    Phase.update($scope.newItemPhase).then(function () {
                        AlertService.success("S???a giai ??o???n th???c hi???n th??nh c??ng");
                        TableController.reloadPage(tablePhaseConfig.tableId);
                        resetFormPhase();
                    }).catch(function (err) {
                        ErrorHandle.handleOneError(err);
                    });
                }, {
                    labels: {
                        'Ok': $translate.instant("global.button.ok"),
                        'Cancel': $translate.instant("global.button.cancel")
                    }
                });

            } else {
                AlertService.error("Giai ??o???n th???c hi???n n??y ???? t???n t???i");
            }
        };

        //delete an item saved
        $scope.deletePhaseSaved = function (index, id) {
            UIkit.modal.confirm($translate.instant("B???n c?? ch???c ch???n mu???n x??a giai ??o???n th???c hi???n"), function () {
                Phase.deleteOne(id).then(function (data) {
                    AlertService.success("Xo?? giai ??o???n th???c hi???n th??nh c??ng");
                    TableController.reloadPage(tablePhaseConfig.tableId);
                    resetFormPhase();
                }).catch(function (err) {
                    ErrorHandle.handleOneError(err);
                });
            }, {
                labels: {
                    'Ok': $translate.instant("global.button.delete"),
                    'Cancel': $translate.instant("global.button.cancel"),
                }
            });
        };

        $scope.cancelHandlePhase = function () {
            resetFormPhase();
        };

        //reset form
        function resetFormPhase(){
            $scope.showAddPhase = false;
            $scope.showEditPhase = false;
            $scope.editPhasePosition = null;
            $scope.newItemPhase = $scope.editItemPhase = {
                name: "",
                description: "",
                state: ""
            };
        }

        function checkExitsPhase(index){
            var newItemPhase = $scope.newItemPhase;
            var phases = $scope.phases;

            if(phases.length < 1) return false;
            var exitst = false;

            for (var i = 0; i < phases.length; i++){
                // item s???a ???? c?? id th?? next, ch??a c?? id th?? next v???i ch??nh n??
                if(index == i) continue;
                if(newItemPhase.name == phases[i].name){
                    exitst = true;
                    break;
                }
            }

            return exitst;
        }

        // =================
        if (angular.element('#form_createSeason').length) {
            var $formValidate = $('#form_createSeason');
            $formValidate
                .parsley({
                    'excluded': 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], .selectize-input > input'
                })
                .on('form:validated', function () {
                    $scope.$apply();
                })
                .on('field:validated', function (parsleyField) {
                    if ($(parsleyField.$element).hasClass('md-input')) {
                        $scope.$apply();
                    }
                });
        }
    }

})();