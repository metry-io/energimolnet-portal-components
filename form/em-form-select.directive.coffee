angular.module('app.directives')

.directive('emFormSelect', ->
  return {
    templateUrl: 'app/components/form/em-form-select.directive.tmpl.jade'
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    transclude: true
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
  }
)
