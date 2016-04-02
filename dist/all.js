'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(require('/controllers/layout.controller.js')) : typeof define === 'function' && define.amd ? define(['/controllers/layout.controller.js'], factory) : factory(global._controllers_layout_controller_js);
})(undefined, function (_controllers_layout_controller_js) {
    'use strict';

    var config = function config($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url: '/',
            template: '<h1><a href="#" ng-click="vm.fn()">{{vm.name}}</a></h1>',
            //controller,
            controllerAs: 'vm'

        });
    };

    config.$inject = ['$urlRouterProvider', '$stateProvider'];

    var layout = angular.module('layout', []);
    layout.config(config);

    var modules = angular.module('modules', []);

    console.log(modules);
    //angular.module('app',[])
});