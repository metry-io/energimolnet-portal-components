angular.module('app.directives')

.directive('emFormFile', [
  '$upload'
  'emUrl'
  ($upload, Url) ->
    return {
      templateUrl: 'app/components/form/em-form-file.directive.tmpl.jade'
      restrict: 'E'
      scope:
        model: '=emModel'
        errors: '=emErrors'
        label: '@emLabel'
      replace: true
      link: (scope, element, attrs) ->
        scope.uploadFiles = (files) ->
          files.forEach (file) ->
            scope.upload = $upload.upload({
              url: Url.url(['assets'])
              method: 'POST'
              file: file
              fileFormDataName: 'media'
            })
            .success (res) ->
              scope.model = res.data.file_path
              scope.errors = undefined
            .error (res) ->
              scope.errors = res.errors

        scope.deleteFile = ->
          scope.model = null
    }
])
