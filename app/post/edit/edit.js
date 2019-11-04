var miControlador = miModulo.controller(
    "postEditController",
    ['$scope', '$http', '$routeParams', '$window', '$location', 'promesasService', 'auth',
    function ($scope, $http, $routeParams, $window, $location, promesasService, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        }
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;
        
        $scope.id = $routeParams.id;
        $scope.controller = "postEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

        promesasService.ajaxGet('post', $scope.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.titulo = response.data.message.titulo;
                $scope.cuerpo = response.data.message.cuerpo;
                $scope.etiquetas = response.data.message.etiquetas;
                $scope.fecha = response.data.message.fecha;
            }, function (error) {
                $scope.fallo = true;
            });

        $scope.modificar = function () {
            const datos = {
                id: $routeParams.id,
                titulo: $scope.titulo,
                cuerpo: $scope.cuerpo,
                etiquetas: $scope.etiquetas,
                fecha: $scope.fecha
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };
            
            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('post', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                    }
                    $scope.hecho = true;
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                });
        }
        $scope.volver = function () {
            window.history.back();
        };
    }]
)