angular.module('app.directives')

.directive('emFormTextarea', function() {
  return {
    template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><textarea ng-model="model" rows="4" class="form-control"></textarea><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>', 
    restrict: 'E',
    scope: {
      model: '=emModel',
      errors: '=emErrors'
    },
    replace: true,
    link: function(scope, element, attrs) {
      scope.label = attrs.emLabel;
    }
  };
});
