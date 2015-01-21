var app = angular.module('jiraplusplus', [
    'ngRoute'
]);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth'] = localStorage.getItem('jwt');
});

app.controller('ApplicationController', function ($scope, PersonalService) {
    $scope.$on('login', function (event, user) {
        $scope.currentUser = user;
    });

    $scope.signout = function () {
        localStorage.clear();
        delete $scope.currentUser;
    };

    if (localStorage.getItem('jwt') && !$scope.currentUser) {
        PersonalService.getUser()
            .success(function (user) {
                $scope.$emit('login', user);
            });
    }
});

app.controller('PersonalController', function ($scope, ProjectService) {
    ProjectService.getProjects()
        .success(function (projects) {
            $scope.projects = projects;
        });
});

app.service('PersonalService', function ($http) {
    this.getUser = function () {
        return $http.get('/api/user');
    }
});

app.controller('SignupController', function ($scope, $location, UserService, SessionService) {
    $scope.signup = function (username, password, passwordConfirmation) {
        if (password !== passwordConfirmation) {
            // TODO: Flash error
            return;
        }

        UserService.signup(username, password)
            .success(function (user) {
                SessionService.login(username, password)
                    .success(function (jwt) {
                        localStorage.setItem('jwt', jwt);
                        $location.path('/users/' + user.username);
                        $location.replace();
                    });
            });
    }
});

app.controller('LoginController', function ($scope, $location, SessionService, PersonalService) {
    $scope.login = function (username, password) {
        SessionService.login(username, password)
            .success(function (jwt) {
                localStorage.setItem('jwt', jwt);

                PersonalService.getUser(jwt)
                    .success(function (user) {
                        $location.path('/');
                        $location.replace();
                        $scope.$emit('login', user);
                    });
            })
            .error(function (data, status) {
                // TODO: Flash error
            });
    };
});

app.service('SessionService', function ($http) {
    this.login = function (username, password) {
        return $http.post('/api/sessions', JSON.stringify({username: username, password: password}));
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
