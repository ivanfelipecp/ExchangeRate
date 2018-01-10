var app = angular.module("exchangeRate",[]);

app.controller("controlador", function($scope, $http){
    
    $http.get("https://api.fixer.io/latest")
    .then(function(response){
        var rates = response.data.rates;
        $scope.keys = Object.keys(rates);
        
        $scope.base = response.data.base;
        $scope.date = response.data.date;
        $scope.rates = {};
        $scope.value = 0;
        $scope.flag = 1;
        $scope.input = 2;

        $scope.keys.forEach(function(rate){
            $scope.rates[rate] = [rates[rate],false,0];
        });

        $scope.rates[$scope.base] = [0,false,0];
        $scope.keys.push($scope.base);
        $scope.base = "";
    });

    $scope.move = function(rate){
        $scope.rates[rate] = [$scope.rates[rate][$scope.value],!$scope.rates[rate][$scope.flag],0];
    }

    $scope.change = function(rate){
        $scope.base = rate;
        $http.get("https://api.fixer.io/latest?base="+$scope.base)
        .then(function(response){
            var rates = response.data.rates;
            $scope.keys.forEach(function(rate){
                if(rate !== $scope.base){
                    $scope.rates[rate] = [rates[rate],$scope.rates[rate][$scope.flag],$scope.rates[rate][$scope.input]];
                }
            });
        });
    }
});