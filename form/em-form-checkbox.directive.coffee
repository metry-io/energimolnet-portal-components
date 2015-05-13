angular.module('app.directives')

.directive('emFormCheckbox', ->
  return {
    template: '<div class="form-group" ng-class="{\'has-error\': errors}">' +
                '<div class="col-sm-offset-2 col-sm-10">' +
                  '<div class="checkbox">' +
                    '<label><input type="checkbox" ng-model="model" /> {{ label }}</label>' +
                  '</div>' +
                  '<p class="help-block" ng-repeat="msg in errors">{{ msg }}</p>' +
                '</div>' +
              '</div>',
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
  }
)
