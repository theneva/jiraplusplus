angular.module('jiraplusplus')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {controller: 'PersonalController', templateUrl: 'templates/index.html'})
            .when('/signup', {controller: 'SignupController', templateUrl: 'templates/signup.html'})
            .when('/login', {controller: 'LoginController', templateUrl: 'templates/login.html'})
            .when('/users', {controller: 'UsersController', templateUrl: 'templates/users/list.html'})
            .when('/users/:username', {controller: 'UserController', templateUrl: 'templates/users/show.html'})
            .when('/projects', {controller: 'ProjectsController', templateUrl: 'templates/projects/index.html'})
            .when('/projects/:projectId', {controller: 'ProjectController', templateUrl: 'templates/projects/show.html'})
    });
