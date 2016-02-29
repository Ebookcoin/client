require('angular');

angular.module('ebookcoinApp').directive('voteTitle', function (gettextCatalog, ebookcoinFilterFilter) {
    return {
        restrict: 'E',
        template: '<div><h2>{{action}}</h2><br><span>{{willCost}}</span></div>',
        replace: true,
        transclude: true,
        scope: {
            adding: '=adding',
            fee: '=fee'
        },
        link: function (scope, element, attrs) {
            if (scope.adding) {
                scope.action = gettextCatalog.getString('Voting for delegates');
            } else {
                scope.action = gettextCatalog.getString('Removing vote from delegates');
            }

            scope.$watch('fee', function (newValue, oldValue) {
                scope.willCost = [
                    gettextCatalog.getString('This action will cost'),
                    ':' + ebookcoinFilterFilter(newValue) + ' EBOOKCOIN.'
                ].join(' ');
            });
        }
    };
});
