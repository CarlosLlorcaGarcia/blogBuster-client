var miControlador = miModulo.controller(
    "postBlogController",
    ['$scope', '$http', '$routeParams', '$window','promesasService', '$location', 'auth', function ($scope, $http, $routeParams, $window, promesasService, $location, auth) {
        $scope.authStatus = auth.data.status;
        $scope.authUsername = auth.data.message;
        
        $scope.paginaActual = parseInt($routeParams.page);
        $scope.rppActual = parseInt($routeParams.pageRows);
        $scope.controller = "postBlogController";
        $scope.user = $window.sessionStorage.getItem("username");

        promesasService.ajaxGetCount('post')
        .then(function (response) {
            $scope.numPaginas = Math.ceil(response.data.message / $scope.rppActual);
            if ($scope.paginaActual < 1) {
                $window.location.href = "/#!/blog/1/" + $scope.rppActual;
            } else if ($scope.paginaActual > $scope.numPaginas) {
                $window.location.href = "/#!/blog/" + $scope.numPaginas + "/" + $scope.rppActual;
            }
            paginacion(2);
        });

        promesasService.ajaxGetPage('post',$scope.paginaActual, $scope.rppActual)
        .then(function (response) {
            $scope.posts = response.data.message;
        });

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