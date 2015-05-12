angular.module('portal-components')

.directive('emFilterSelect', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="form-group" ng-class="{\'has-success\': filter.length}">' +
                '<select class="form-control" ng-model="filter" ng-transclude></select>' +
              '</div>',
    scope: {
      key: '@emKey',
    },
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      var resMgr = resourceTableCtrl.resMgr;

      scope.filter = resMgr.filter[scope.key];

      scope.$watch('filter', function(newFilter, oldFilter) {
        if (newFilter === oldFilter) return;

        resMgr.setFilterOption(scope.key, newFilter);
      });
    }
  };
});
