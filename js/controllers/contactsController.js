require('angular');

angular.module('ebookcoinApp').controller('contactsController', ['$scope', '$rootScope', '$http', 'viewFactory', 'contactsService', 'ngTableParams', 'userService', '$timeout', 'gettextCatalog', function ($rootScope, $scope, $http, viewFactory, contactsService, ngTableParams, userService, $timeout, gettextCatalog) {

    $scope.view = viewFactory;
    $scope.view.inLoading = true;
    $scope.view.loadingText = gettextCatalog.getString('Loading contacts');
    $scope.view.page = {title: gettextCatalog.getString('Contacts'), previous: null};
    $scope.view.bar = {showContactsBar: true};
    $scope.contactsView = contactsService;

    // Contacts table
    $scope.tableContacts = new ngTableParams({
        page: 1,            // Show first page
        count: 25,
        sorting: {
            username: 'asc' // Initial sorting
        }
    }, {
        counts: [],
        total: 0,
        getData: function ($defer, params) {
            contactsService.getSortedContacts($defer, params, $scope.filter, function (err) {
                $scope.view.inLoading = false;
                $http.get('/api/contacts/unconfirmed', {
                    params: {
                        publicKey: userService.publicKey
                    }
                })
                    .then(function (resp) {
                        var unconfirmedTransactions = resp.data.contacts;
                        $scope.view.inLoading = false;
                        $timeout(function () {

                            $scope.unconfirmedContacts = unconfirmedTransactions.filter(function (element) {
                                if (element.type == 5) {
                                    if (element.asset.contact.address.indexOf('+') != -1) {
                                        element.asset.contact.address =  element.asset.contact.address.replace("+", '');
                                        return true;
                                    }
                                    return false;
                                }
                            });
                            $scope.$apply();
                        }, 1);

                    });
            });
        }
    });

    $scope.tableContacts.cols = {
        username : gettextCatalog.getString('Username'),
        address : gettextCatalog.getString('PLTChainCoin Address')
    };

    $scope.tableContacts.settings().$scope = $scope;

    $scope.$watch("filter.$", function () {
        $scope.tableContacts.reload();
    });

    $scope.updateContacts = function () {
        $scope.tableContacts.reload();
    };

    $scope.$on('updateControllerData', function (event, data) {
        if (data.indexOf('main.contacts') != -1) {
            $scope.updateContacts();
        }
    });

}]);
