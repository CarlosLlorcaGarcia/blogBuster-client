var miControlador = miModulo.controller(
    "postNewController",
    ['$scope', '$http', '$routeParams', '$window', 'promesasService', '$location', 'auth',
        function ($scope, $http, $routeParams, $window, promesasService, $location, auth) {
            if (auth.data.status != 200) {
                $location.path('/login');
            }
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
    
            $scope.controller = "postNewController";
            $scope.fallo = false;
            $scope.hecho = false;
            $scope.falloMensaje = "";
    
            promesasService.ajaxCheck()
                .then(function (response) {
                    if (response.data.status == 200) {
                        $scope.session = true;
                        $scope.usuario = response.data.message;
                    } else {
                        $scope.session = false;
                    }
                }, function (response) {
                    $scope.session = false;
                })
    
            $scope.new = function () {
                const datos = {
                    titulo: $scope.titulo,
                    cuerpo: $scope.cuerpo,
                    etiquetas: $scope.etiquetas,
                    fecha: $scope.fecha
                }
                var jsonToSend = {
                    data: JSON.stringify(datos)
                };
                $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
                promesasService.ajaxNew('post', { params: jsonToSend })
                    .then(function successCallback(response) {
                        if (response.data.status != 200) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.response;
                        } else {
                            $scope.fallo = false;
                            $scope.hecho = true;
                        }
                        $scope.hecho = true;
                    }, function (error) {
                        $scope.hecho = true;
                        $scope.fallo = true;
                        $scope.falloMensaje = error.message + " " + error.stack;
    
                    });
            }
            $scope.volver = function () {
                window.history.back();
            };
            $scope.cerrar = function () {
                $location.path('/blog/1/10');
            };
        }]
)