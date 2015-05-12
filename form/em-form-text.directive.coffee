angular.module('app.directives')

.directive('emFormText', ->
  return {
    templateUrl: 'app/components/form/em-form-text.directive.tmpl.jade'
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
  }
)
