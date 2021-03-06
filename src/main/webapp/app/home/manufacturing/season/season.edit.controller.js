(function () {
    'use strict';
    angular.module('erpApp')
        .controller('SeasonEditController', SeasonEditController);

    SeasonEditController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AlertService',
        'AlertModalService', '$translate', 'ErrorHandle', 'ComboBoxController', 'TableController',
        '$timeout', 'Season', 'Phase', 'DateTimeValidation', '$filter'];

    function SeasonEditController($rootScope, $scope, $state, $stateParams, AlertService,
                                    AlertModalService, $translate, ErrorHandle, ComboBoxController, TableController,
                                    $timeout, Season, Phase, DateTimeValidation, $filter) {
        DateTimeValidation.init($scope);
        $scope.ComboBox = {};
        $scope.season = {};
        $scope.blockModal = null;
        $scope.blockUI = function () {
            if($scope.blockModal != null)
                $scope.blockModal.hide();
            $scope.blockModal = null;
            $scope.blockModal = UIkit.modal.blockUI('<div class=\'uk-text-center\'>Please Wait...<br/><img class=\'uk-margin-top\' src=\'assets/img/spinners/spinner_success.gif\' alt=\'\'>');
        };

        function genDate(time) {
            return $filter('date')(time, 'dd/MM/yyyy');
        }

        $scope.msg = {
            required_msg : $translate.instant('admin.messages.required'),
            gln_msg : $translate.instant('global.messages.number_msg'),
            maxLength12 : $translate.instant('global.messages.maxLength12'),
            maxLength20 : $translate.instant('global.messages.maxLength20'),
            maxLength255 : $translate.instant('global.messages.maxLength255'),
            maxLength1000: $translate.instant('global.messages.maxLength1000')
        };

        $scope.maxDate = null;
        maxDate();
        function maxDate(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var tomorrow = dd + '/' + mm + '/' + yyyy;
            $scope.maxDate = tomorrow;
        }

        function reloadDatepicker(id){
            var datePickerInit = $("#" + id);
            datePickerInit.on("blur", function () {
                DateTimeValidation.onBlurDate($(this), false);
            }).kendoDatePicker({
                format: "dd/MM/yyyy",
                change: function () {
                    if(id === 'expectedBeginDate'){
                        $scope.season.expectedBeginDate = this.value() != null ? this.value().getTime() : null;
                    } else if(id === 'realityBeginDate'){
                        $scope.season.realityBeginDate = this.value() != null ? this.value().getTime() : null;
                    } else if(id === 'expectedFinishDate'){
                        $scope.season.expectedFinishDate = this.value() != null ? this.value().getTime() : null;
                    } else if(id === 'realityFinishDate'){
                        $scope.season.realityFinishDate = this.value() != null ? this.value().getTime() : null;
                    }
                }
            });
        }

        function refreshDatePicker(id, val){
            var datepicker = $("#" + id).data("kendoDatePicker");
            datepicker.value(val ? genDate(val) : null);
            datepicker.trigger("change");
        }

        function checkValidDate(){
            var isValid = true;
            if($scope.season.expectedBeginDate && $scope.season.expectedFinishDate
                && ($scope.season.expectedBeginDate > $scope.season.expectedFinishDate))
            {
                AlertService.error("Ng??y b???t ?????u DK ph???i tr?????c Ng??y k???t th??c DK");
                isValid = false;
            }

            if($scope.season.realityBeginDate && $scope.season.realityFinishDate
                && ($scope.season.realityBeginDate > $scope.season.realityFinishDate))
            {
                AlertService.error("Ng??y b???t ?????u TT ph???i tr?????c Ng??y k???t th??c TT");
                isValid = false;
            }

            return isValid;
        }

        function checkValidPhase (type) {
            //type = 1: ??ang th???c hi???n - ch??? c???n 1 tick l?? ??c
            // type = 2: ho??n th??nh, to??n b??? ph???i ??c tick
            var phases = $scope.phases;
            var countTick = 0;

            for(var i = 0; i < phases.length; i++){
                if(phases[i].state) countTick += 1;
            }

            if(type === 1) return countTick >= 0;
            else return countTick === phases.length;
        }

        Season.getFull($stateParams.seasonId).then(function(data){
            $scope.season = data;

            areaCbb.options = [data.area];
            areaCbb.resetScroll = true;
            areaCbb.originParams = 'tenantId==' + data.tenantId;
            ComboBoxController.init($scope, areaCbb);

            productCbb.options = [data.product];
            productCbb.resetScroll = true;
            productCbb.originParams = "tenantId==" + data.tenantId;
            ComboBoxController.init($scope, productCbb);

            reloadDatepicker('expectedBeginDate');
            reloadDatepicker('realityBeginDate');
            reloadDatepicker('expectedFinishDate');
            reloadDatepicker('realityFinishDate');

            refreshDatePicker('expectedBeginDate', data.expectedBeginDate);
            refreshDatePicker('realityBeginDate', data.realityBeginDate);
            refreshDatePicker('expectedFinishDate', data.expectedFinishDate);
            refreshDatePicker('realityFinishDate', data.realityFinishDate);
        }).catch(function (err) {
            ErrorHandle.handleError(err);
        });

        // ================================
        // combo box for detail page
        var areaCbb = {
            id:'areaCbb',
            url:'/api/areas',
            originParams:'',
            queryRelate: '',
            valueField:'id',
            labelField:'name',
            searchField:'name',
            table: null,
            column: null,
            maxItems:1,
            ngModel:[],
            options:[],
            placeholder: $translate.instant("global.placeholder.choose")
        };
        ComboBoxController.init($scope, areaCbb);

        var productCbb = {
            id:'productCbb',
            url:'/api/products',
            specialUrl: '',
            originParams:'',
            queryRelate: '',
            valueField:'id',
            labelField:'name',
            searchField:'name',
            table: null,
            column: null,
            maxItems: 1,
            ngModel: [],
            options: [],
            placeholder: $translate.instant("global.placeholder.choose")
        };
        ComboBoxController.init($scope, productCbb);

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
                // $scope.newItemPhase.active = true;
                // $scope.phases.push($scope.newItemPhase);
                // th??m m???i giai ??o???n th???c hi???n
                UIkit.modal.confirm("B???n mu???n th??m m???i giai ??o???n th???c hi???n?", function () {
                    $scope.newItemPhase.seasonId = $stateParams.seasonId;
                    $scope.newItemPhase.tenantId = $scope.season.tenantId;

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
        // =============================================
        // get season c?? giai ??o???n g???n d??y nh???t trong ?????a ??i???m n??y
        $scope.btnDisable = false;
        $scope.submit = function (isClose) {
            if($scope.btnDisable) return;
            var $form = $('#form_createSeason');
            $('#form_createSeason').parsley();
            if (!$scope.form_createSeason.$valid) return;
            if(!ComboBoxController.checkIsValidForm($form)) return;

            // check con gd chua luu
            if($scope.showAddPhase || $scope.showEditPhase){
                AlertService.error("C??n giai ??o???n ch??a ???????c l??u, xin th??? l???i");
                return;
            }

            if(!checkValidDate()){
                return;
            }

            if($scope.season.state !== 0 && !checkValidPhase($scope.season.state)){
                if($scope.season.state === 1){
                    AlertService.error("Vui l??ng tick ch???n ??t nh???t 1 giai ??o???n th???c hi???n ????? ti???p t???c");
                } else{
                    AlertService.error("V???n c??n giai ??o???n th???c hi???n ch??a ???????c ho??n th??nh");
                }
                return;
            }

            $scope.blockUI();
            $scope.btnDisable = true;
            Season.update($scope.season).then(function (data) {
                $scope.blockModal.hide();
                AlertModalService.popup("success.msg.create");
                $timeout(function () {
                    isClose?$state.go('seasons'):$state.go('seasons-detail',{seasonId: data.id});
                },1100);
            }).catch(function (data) {
                $scope.btnDisable = false;
                $scope.blockModal.hide();
                ErrorHandle.handleOneError(data);
            });
        };

        // ======================================

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