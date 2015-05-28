angular.module('portal-components')

.directive('emFilterSelect', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="form-group" ng-class="{\'has-success\': filter.length && filter !== default}">' +
                '<select class="form-control" ng-model="filter" ng-transclude><option value=""></option></select>' +
              '</div>',
    scope: {
      key: '@emKey',
      default: '=emDefaultValue'
    },
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      var resMgr = resourceTableCtrl.resMgr;

      scope.filter = resMgr.filter[scope.key];
      scope.resMgrFilter = resMgr.filter;

      scope.$watch('filter', function(newFilter, oldFilter) {
        if (newFilter === oldFilter) return;

        resMgr.setFilterOption(scope.key, newFilter);
      });

      scope.$watch('resMgrFilter.' + scope.key, function(newFilter, oldFilter) {
        if (newFilter === oldFilter) return;

        scope.filter = newFilter;
      });
    }
  };
});
