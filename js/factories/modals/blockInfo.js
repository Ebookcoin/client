require('angular');

angular.module('ebookcoinApp').factory('blockInfo', function (btfModal) {
    return btfModal({
        controller: 'blockInfoController',
        templateUrl: '/partials/modals/blockInfo.html'
    });
});
