/**
 * Created by murta on 07/06/15.
 */
(function() {
    'use strict';
    angular.module('naut').factory('imagesService', imagesService);

    /* @ngInject */
    function imagesService($rootScope, toaster, $http) {
        var self = this;

        self.create = function(owner_type, owner_id, image, arrayToPushResult, statusObject) {
            if(!owner_type || owner_type === '' || !owner_id || owner_id === '') {
                owner_type = null;
                owner_id = null;
            } else {
                image.owner_type  = owner_type;
                image.owner_id = owner_id;
            }
            return $http.post($rootScope.app.env.backend + '/images.json', image).success(function (data) {
                arrayToPushResult.push(data);
                statusObject.uploading = false;
                toaster.success('Mensagem', 'Imagem criada com sucesso!');
            }).error(self.handleError);
        };

        self.destroy = function(imageId, callback) {
            return $http.delete($rootScope.app.env.backend + '/images/' + imageId + '.json')
                .success(function (data) {
                    toaster.success('Mensagem', 'Imagem removida com sucesso!');
                    callback();
                }).error(self.handleError);
        };

        self.handleError = function (data) {
            var message = "";
            message = message + Object.keys(data.errors)[0];
            message = message + ' ' + data.errors[Object.keys(data.errors)[0]];
            toaster.error('Erro', message);
        };

        return self;
    }
})();