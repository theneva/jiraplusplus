var app = angular.module('jiraplusplus', [
    'ngRoute'
]);

app.controller('PersonalController', function ($scope, ProjectService) {
    ProjectService.getProjects()
        .success(function (projects) {
            $scope.projects = projects;
        });
});

app.controller('SignupController', function ($scope, $location, UserService) {
    $scope.signup = function (username, password, passwordConfirmation) {
        if (password !== passwordConfirmation) {
            // TODO: Flash error
            return;
        }

        UserService.signup(username, password)
            .success(function(user) {
                $location.path('/users/' + user.username);
                $location.replace();
            });
    }
});

app.service('UserService', function ($http) {
    this.getUsers = function () {
        return $http.get('/api/users');
    };

    this.getUser = function (username) {
        return $http.get('/api/users/' + username);
    };

    this.signup = function (username, password) {
        return $http.post('/api/users', JSON.stringify({username: username, password: password}));
    }
});

app.service('ProjectService', function ($http) {
    this.getProjects = function () {
        return $http.get('/api/projects');
    };
});

app.controller('UsersController', function ($scope, $http, UserService) {
    UserService.getUsers()
        .success(function (users) {
            $scope.users = users;
        });
});

app.controller('UserController', function ($scope, $http, $routeParams, UserService) {
    var username = $routeParams.username;

    UserService.getUser(username)
        .success(function (user) {
            $scope.user = user;
        });
});
