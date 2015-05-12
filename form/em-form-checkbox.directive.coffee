angular.module('app.directives')

.directive('emFormCheckbox', ->
  return {
    templateUrl: 'app/components/form/em-form-checkbox.directive.tmpl.jade'
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
  }
)
