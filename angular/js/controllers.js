var app = angular.module('jiraplusplus', [
    'ngRoute'
]);

app.controller('ProjectsController', function ($scope, ProjectsService) {
    localStorage.projects = ProjectsService.getProjects().success(function (projects) {
        $scope.projects = projects;
    });
});

app.service('ProjectsService', function ($http) {
    this.getProjects = function () {
        return $http.get('/api/projects');
    };
});
