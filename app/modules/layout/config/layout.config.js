import controller from '../controllers/layout.controller';

let config = function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            template: '<h1><a href="#" ng-click="vm.fn()">{{vm.text}} </a></h1>',
            controller,
            controllerAs: 'vm'

        })
}

config.$inject = ['$urlRouterProvider', '$stateProvider'];

export default config;