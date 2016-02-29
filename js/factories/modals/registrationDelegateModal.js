require('angular');

angular.module('ebookcoinApp').factory('registrationDelegateModal', function (btfModal) {
    return btfModal({
        controller: 'registrationDelegateModalController',
        templateUrl: '/partials/modals/registrationDelegateModal.html'
    });
});
