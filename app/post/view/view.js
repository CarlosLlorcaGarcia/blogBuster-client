var miControlador = miModulo.controller(
    "postViewController",
    ['$scope', '$http', '$routeParams', '$window', 'promesasService', '$location', 'auth',
    function ($scope, $http, $routeParams, $window, promesasService, $location, auth) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;

        $scope.id = $routeParams.id;
        $scope.controller = "postViewController";
        $scope.user = $window.sessionStorage.getItem("username");

        promesasService.ajaxGet('post', $scope.id)
        .then(function (response) {
            $scope.post = response.data.message;
        });

        $scope.volver = function(){
            window.history.back();
        };
    }]
)