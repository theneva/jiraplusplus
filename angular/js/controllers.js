var app = angular.module('jiraplusplus', [
    'ngRoute'
]);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth'] = localStorage.getItem('jwt') || '';
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
        })
        .error(function (data, status) {
            if (status === 401) {
                $scope.error = 'No projects to display; please log in.';
            }
        });

    $scope.newProject = function (newProjectName) {
        ProjectService.newProject(newProjectName)
            .success(function (createdProject) {
                console.log('pushing ' + createdProject);
                $scope.projects.push(createdProject);
            });
    }
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
    };
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
            .error(function (message) {
                $scope.error = message;
            });
    };
});

app.service('SessionService', function ($http) {
    this.login = function (username, password) {
        return $http.post('/api/sessions', {username: username, password: password});
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
        return $http.post('/api/users', {username: username, password: password});
    }
});

app.service('ProjectService', function ($http) {
    this.getProjects = function () {
        return $http.get('/api/projects');
    };

    this.getProject = function (projectId) {
        return $http.get('/api/projects/' + projectId);
    };

    this.newProject = function (newProjectName) {
        return $http.post('/api/projects/', {name: newProjectName});
    };

    this.deleteProject = function (projectId) {
        return $http.delete('/api/projects/' + projectId);
    };
});

app.service('IssueService', function ($http) {
    this.getIssues = function () {
        return $http.get('/api/issues');
    }

    this.getIssue = function (projectId, issueId) {
        return $http.get('/api/projects/' + projectId + '/issues/' + id);
    }

    this.newIssue = function (projectId, issueName) {
        return $http.post('/api/projects/' + projectId + '/issues/', {name: issueName});
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

app.controller('ProjectsController', function ($scope, ProjectService) {
    $scope.newProject = function (projectId) {
        ProjectService.newProject(projectId)
            .success(function (project) {
                $scope.projects.push(project);
            });
    };

    $scope.deleteProject = function (projectId) {
        ProjectService.deleteProject(projectId)
            .success(function () {
                $scope.projects = _.reject($scope.projects, function (project) {
                    return project._id === projectId;
                });
            });
    };

    ProjectService.getProjects()
        .success(function (projects) {
            $scope.projects = projects;
        });
});

app.controller('ProjectController', function ($scope, $routeParams, ProjectService, IssueService) {
    ProjectService.getProject($routeParams.projectId)
        .success(function (project) {
            $scope.project = project;
        });

    $scope.newIssue = function (issueName) {
        IssueService.newIssue($routeParams.projectId, issueName);
    };
});
