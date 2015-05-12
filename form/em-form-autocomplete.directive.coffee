angular.module('app.directives')

.directive('emFormAutocomplete', ->
  return {
    restrict: 'E'
    templateUrl: 'app/components/form/em-form-autocomplete.directive.tmpl.jade'
    replace: true
    scope:
      model: '=emModel'
      errors: '=emErrors'
      apiResource: '&emApiResource'
      queryParams: '=emQueryParams'
    link: (scope, element, attrs) ->
      scope.label = attrs.emLabel
      scope.placeholder = attrs.emPlaceholder
  }
)
