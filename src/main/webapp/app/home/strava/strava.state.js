(function () {
    'use strict';
    angular.module('erpApp')
        .config(stateConfig);
    stateConfig.$inject = ['$stateProvider']

    function stateConfig($stateProvider) {

        $stateProvider
            .state('strava', {
                parent: 'restricted',
                template: "<div ui-view></div>",
                abstract: true,
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('admin');
                        $translatePartialLoader.addPart('errors');
                        $translatePartialLoader.addPart('success');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('infrastructure');
                        return $translate.refresh();
                    }]
                }
            })
            .state('list-strava', {
                parent: 'strava',
                url: '/list-strava',
                templateUrl: 'app/home/strava/list-run/run.home.html',
                controller: 'RunHomeController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'admin.strava.run',
                    sideBarMenu: 'inventory'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'lazy_ionRangeSlider',
                            'lazy_tablesorter',
                            'lazy_iCheck',
                            'lazy_tree',
                            'lazy_parsleyjs',
                            'lazy_KendoUI',
                            'app/home/strava/list-run/run.home.controller.js'
                        ]);
                    }]
                }
            })
    }
})();