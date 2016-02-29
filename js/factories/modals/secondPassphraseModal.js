require('angular');

angular.module('ebookcoinApp').factory('secondPassphraseModal', function (btfModal) {
    return btfModal({
        controller: 'secondPassphraseModalController',
        templateUrl: '/partials/modals/secondPassphraseModal.html'
    });
});
