require('angular');

angular.module('ebookcoinApp').factory('multisignatureModal', function (btfModal) {
    return btfModal({
        controller: 'multisignatureModalController',
        templateUrl: '/partials/modals/multisignatureModal.html'
    });
});
