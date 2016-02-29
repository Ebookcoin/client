require('angular');

angular.module('ebookcoinApp').factory('transactionInfo', function (btfModal) {
    return btfModal({
        controller: 'transactionInfoController',
        templateUrl: '/partials/modals/transactionInfo.html'
    });
});
