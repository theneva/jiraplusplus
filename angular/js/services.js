var app = angular.module('jiraplusplusServices', [
    'ngResource'
]);

app.factory('Project', ['$resource', function($resource) {
    return $resource('/api/projects/:id', {id: "@_id"});
}]);

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


app.service('IssueService', function ($http) {
    this.getIssues = function () {
        return $http.get('/api/issues');
    };

    this.getIssue = function (projectId, issueId) {
        return $http.get('/api/projects/' + projectId + '/issues/' + id);
    };

    this.newIssue = function (projectId, issueName) {
        return $http.post('/api/projects/' + projectId + '/issues/', {name: issueName});
    };

    this.deleteIssue = function (projectId, issueId) {
        return $http.delete('/api/projects/' + projectId + '/issues/' + issueId);
    };
});

app.service('PersonalService', function ($http) {
    this.getUser = function () {
        return $http.get('/api/user');
    }
});