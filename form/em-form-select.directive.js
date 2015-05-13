angular.module('app.directives')

.directive('emFormSelect', function() {
  return {
    template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><select ng-model="model" ng-transclude="ng-transclude" class="form-control"></select><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>',
    restrict: 'E',
    scope: {
      model: '=emModel',
      errors: '=emErrors'
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.label = attrs.emLabel;
    }
  };
});
