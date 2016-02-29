require('angular');

angular.module('ebookcoinApp').factory('voteModal', function (btfModal) {
    return btfModal({
        controller: 'voteController',
        templateUrl: '/partials/modals/vote.html'
    });
});
