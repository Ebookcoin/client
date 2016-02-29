require('angular');

angular.module('ebookcoinApp').factory('multiMembersModal', function (btfModal) {
    return btfModal({
        controller: 'multiMembersModalController',
        templateUrl: '/partials/modals/multiMembersModal.html'
    });
});
