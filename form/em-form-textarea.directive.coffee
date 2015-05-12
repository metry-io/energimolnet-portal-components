angular.module('app.directives')

.directive('emFormTextarea', ->
  return {
    templateUrl: 'app/components/form/em-form-textarea.directive.tmpl.jade'
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
  }
)
