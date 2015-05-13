angular.module('app.directives')

.directive('emFormAutocomplete', function() {
  return {
    restrict: 'E',
    template: '<div class="form-group" ng-class="{\'has-error\': errors}">' +
                '<label class="col-sm-2 control-label">{{ label }}</label>' +
                '<div class="col-sm-10">' +
                  '<em-autocomplete em-model="model" em-api-resource="apiResource()" em-placeholder="{{ placeholder }}" em-query-params="queryParams"></em-autocomplete>' +
                  '<p class="help-block" ng-repeat="msg in errors">{{ msg }}</p>' +
                '</div>' +
              '</div>',
    replace: true,
    scope: {
      model: '=emModel',
      errors: '=emErrors',
      apiResource: '&emApiResource',
      queryParams: '=emQueryParams'
    },
    link: function(scope, element, attrs) {
      scope.label = attrs.emLabel;
      scope.placeholder = attrs.emPlaceholder;
    }
  };
});
