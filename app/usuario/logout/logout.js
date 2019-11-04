var miControlador = miModulo.controller(
    "userLogoutController",
    ['$scope', '$http', '$window', 'promesasService', '$location', function ($scope, $http, $window, promesasService, $location) {
        $scope.controller = "userLogoutController";

            promesasService.ajaxLogout()
                .then(function (response) {
                    if (response.data.status == 200){
                        $window.sessionStorage.removeItem("username");
                        $location.path("/login")
                    }
                })

    }]
)