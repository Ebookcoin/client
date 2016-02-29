require('angular');

angular.module('ebookcoinApp').factory('confirmDeletionModal', function (btfModal) {
    return btfModal({
        controller: 'confirmDeletionModalController',
        templateUrl: '/partials/modals/confirmDeletionModal.html'
    });
});
