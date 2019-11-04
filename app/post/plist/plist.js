var miControlador = miModulo.controller(
    "postPlistController",
    ['$scope', '$http', '$routeParams', '$window', 'promesasService', '$location', 'auth',
    function ($scope, $http, $routeParams, $window, promesasService, $location, auth) {
        if (auth.data.status != 200) {
            $location.path('/login');
        }
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;
        
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.pageRows);
        $scope.colOrder = $routeParams.colOrder;
        $scope.order = $routeParams.order;
        $scope.controller = "postPlistController";
        $scope.user = $window.sessionStorage.getItem("username");

        promesasService.ajaxGetCount('post')
        .then(function (response) {
            $scope.numPaginas = Math.ceil(response.data.message / $scope.rppActual);
            if ($scope.paginaActual < 1) {
                $window.location.href = "/#!/post/plist/1/" + $scope.rppActual;
            } else if ($scope.paginaActual > $scope.numPaginas) {
                $window.location.href = "/#!/post/plist/" + $scope.numPaginas + "/" + $scope.rppActual;
            }
            paginacion(2);
        });

        if ($scope.order == null || $scope.colOrder == null) {
            request = "http://localhost:8081/blogbuster/json?ob=post&op=getpage&page=" + $scope.paginaActual + "&rpp=" + $scope.rppActual;
        } else {
            request = "http://localhost:8081/blogbuster/json?ob=post&op=getpage&page=" + $scope.paginaActual + "&rpp=" + $scope.rppActual + "&order=" + $scope.colOrder + "," + $scope.order
        }

        $http({
            method: "GET",
            withCredentials: true,
            url: request
        }).then(function (response) {
            $scope.tablaPosts = response.data.message;
        });

        $scope.showSelectValue = function (mySelect) {
            $window.location.href = "/blogBuster-client/#!/post/plist/1/" + mySelect;
        }

        function paginacion(vecindad) {
            vecindad++;
            $scope.botonera = [];
            for (i = 1; i <= $scope.numPaginas; i++) {
                if (i == 1) {
                    $scope.botonera.push(i);
                } else if (i > ($scope.paginaActual - vecindad) && i < ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push(i);
                } else if (i == $scope.numPaginas) {
                    $scope.botonera.push(i);
                } else if (i == ($scope.paginaActual - vecindad) || i == ($scope.paginaActual + vecindad)) {
                    $scope.botonera.push('...');
                }
            }
        }
    }]
)
