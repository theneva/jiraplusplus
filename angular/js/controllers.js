var app = angular.module('jiraplusplus', [
    'ngRoute',
    'jiraplusplusServices'
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

app.controller('PersonalController', function ($scope, Project) {
    
    Project.query({}, function(res) {
        $scope.projects = res.data;
    }, function (res) {
        if (res.status === 401) {
            $scope.error = 'No projects to display; please log in.';
        }
    });
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

app.controller('ProjectsController', function ($scope, Project) {
    $scope.newProject = function (projectId) {
        var project = new Project({name: projectId});
        project.$save();

        $scope.projects.push(project);
        $scope.newProjectName = '';
    };

    $scope.deleteProject = function (projectId) {
        Project.delete({id: projectId});

        $scope.projects = _.reject($scope.projects, function (project) {
            return project._id === projectId;
        });
    };

    $scope.projects = Project.query();
});

app.controller('ProjectController', function ($scope, $routeParams, Project, IssueService) {
    $scope.project = Project.get({id: $routeParams.projectId});

    $scope.newIssue = function (issueName) {
        IssueService.newIssue($routeParams.projectId, issueName)
            .success(function (issue) {
                // TODO bind the new issue to the project.
            });
    };

    $scope.deleteIssue = function (issueId) {
        IssueService.deleteIssue($routeParams.projectId, issueId)
            .success(function () {
                // TODO bind the removal to the project.
            });
    }
});
