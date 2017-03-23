angular.module('main', ['ngRoute',
    'ngAnimate',
    'main.home',
    'main.settings',
    'dndLists',
    'firebase',
    'ngTagsInput'
])
    .run(function () {
        var config = {
            apiKey: 'AIzaSyAdAv-q6ogRT2rSAqAQ6cd8BrD--MCpwUw',
            authDomain: 'localhost',
            databaseURL: 'https://test-e27.firebaseio.com/'
        };
        firebase.initializeApp(config);
    })
    .config(mainConfig);

mainConfig.$inject = ['$routeProvider'];

function mainConfig($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .otherwise({
            redirectTo: '/home'
        });
}