angular.module('jiraplusplus')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {controller: 'PersonalController', templateUrl: 'templates/personal.html'})
            .when('/signup', {controller: 'SignupController', templateUrl: 'templates/signup.html'})
            .when('/users', {controller: 'UsersController', templateUrl: 'templates/users/users.html'})
            .when('/users/:username', {controller: 'UserController', templateUrl: 'templates/users/user.html'})
    });

