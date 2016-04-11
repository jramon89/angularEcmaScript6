'use strict';

class layout$1{
	constructor(){
		this.text='Layout';
		
	}
	fn(){
		alert(this.text);
	}
}

let config = function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            template: '<h1><a href="#" ng-click="vm.fn()">{{vm.text}} </a></h1>',
            controller: layout$1,
            controllerAs: 'vm'

        })
}

config.$inject = ['$urlRouterProvider', '$stateProvider'];

let layout = angular.module('layout', [])
layout.config(config)

let modules = angular.module('modules', [layout.name]);

angular.module('app', [
    'ui.router',
    modules.name
])