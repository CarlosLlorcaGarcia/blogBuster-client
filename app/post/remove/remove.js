var miControlador = miModulo.controller(
    "postRemoveController",
    ['$scope', '$http', '$routeParams', '$window', 'promesasService', '$location', 'auth',
    function ($scope, $http, $routeParams, $window, promesasService, $location, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        }
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;
        
        $scope.id = $routeParams.id;
        $scope.user = $window.sessionStorage.getItem("username");

        promesasService.ajaxGet('post',$routeParams.id)
        .then(function (response) {
            $scope.post = response.data.message;
        });

        $scope.borrar = function () {
            promesasService.ajaxGet('post',$routeParams.id)
            .then(function (response) {
                window.history.back();
            });
        }

        $scope.volver = function(){
            window.history.back();
        };
    }]
)
