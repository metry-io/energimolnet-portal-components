angular.module('app.directives')

.directive('emFormFile', [
  '$upload'
  'emUrl'
  ($upload, Url) ->
    return {
      template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><input type="file" ng-file-select="uploadFiles($files)"/><div ng-file-drop="uploadFiles($files)" ng-file-drag-over-class="drag-over" ng-file-drop-available="dropSupported=true" class="drop-box"></div><div ng-show="dropSupported &amp;&amp; !model">Drop files here</div><img ng-show="showThumbnail(model)" ng-src="{{ model }"/><a ng-show="model" ng-href="{{ model }}" target="_blank">{{ model }}</a><button ng-click="upload.abort()" class="btn btn-default btn-xs">Cancel Upload</button><button ng-click="deleteFile(model)" ng-show="model" class="btn btn-danger btn-xs">Delete file</button><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>',
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
