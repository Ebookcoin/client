require('angular');

angular.module('ebookcoinApp').factory('newUser', function (btfModal) {
    return btfModal({
        controller: 'newUserController',
        templateUrl: '/partials/modals/newUser.html'
    });
});
