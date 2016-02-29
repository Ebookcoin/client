require('angular');

angular.module('ebookcoinApp').factory('userSettingsModal', function (btfModal) {
    return btfModal({
        controller: 'userSettingsModalController',
        templateUrl: '/partials/modals/userSettingsModal.html'
    });
});
