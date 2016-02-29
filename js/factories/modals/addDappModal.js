require('angular');

angular.module('ebookcoinApp').factory('addDappModal', function (btfModal) {
    return btfModal({
        controller: 'addDappModalController',
        templateUrl: '/partials/modals/addDappModal.html'
    });
});
