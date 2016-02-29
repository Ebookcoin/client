require('angular');

angular.module('ebookcoinApp').factory('masterPassphraseModal', function (btfModal) {
    return btfModal({
        controller: 'masterPassphraseModalController',
        templateUrl: '/partials/modals/masterPassphraseModal.html'
    });
});
