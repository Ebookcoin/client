require('angular');

angular.module('ebookcoinApp').controller('newUserController', ["$scope", "$http", "newUser", "userService", "$state", "viewFactory", 'gettextCatalog', function ($scope, $http, newUser, userService, $state, viewFactory, gettextCatalog) {

    $scope.noMatch = false;
    $scope.firstStep = true;
    $scope.view = viewFactory;
    $scope.view.loadingText = gettextCatalog.getString('Registering user');
    $scope.view.inLoading = false;

    $scope.activeLabel = function (pass) {
        return pass != '';
    }

    $scope.generatePassphrase = function () {
        var Mnemonic = require('bitcore-mnemonic');
        var code = new Mnemonic(Mnemonic.Words.ENGLISH);
        $scope.newPassphrase = code.toString();
    };

    $scope.step = function () {
        if ($scope.firstStep) {
            $scope.passToCheck = $scope.newPassphrase;
        }
        $scope.firstStep = !$scope.firstStep;
    }

    $scope.savePassToFile = function (pass) {
        var blob = new Blob([pass], {type: "text/plain;charset=utf-8"});
        FS.saveAs(blob, "PLTCHAINPassphrase.txt");
    }

    $scope.login = function (pass) {
        $scope.noMatch = false;
        var data = {secret: pass};
        if ($scope.passToCheck != pass) {
            $scope.noMatch = true;
        } else {
            $scope.view.inLoading = true;
            $http.post("/api/accounts/open/", {secret: pass})
                .then(function (resp) {
                    $scope.view.inLoading = false;
                    if (resp.data.success) {
                        newUser.deactivate();
                        userService.setData(resp.data.account.address, resp.data.account.publicKey, resp.data.account.balance, resp.data.account.unconfirmedBalance, resp.data.account.effectiveBalance);
                        userService.setForging(resp.data.account.forging);
                        userService.setSecondPassphrase(resp.data.account.secondSignature);
                        userService.unconfirmedPassphrase = resp.data.account.unconfirmedSignature;
                        $state.go('main.dashboard');
                    } else {
                        alert("Something wrong. Restart server please.");
                    }
                });
        }
    }

    $scope.close = function () {
        newUser.deactivate();
    }

    $scope.generatePassphrase();

}]);
