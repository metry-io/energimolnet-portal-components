angular.module('energimolnet.ui')

.directive('emFilterText', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="form-group" ng-class="{\'has-success\': filter.length}">' +
                '<input class="form-control"' +
                'type="text"' +
                'ng-model="filter"' +
                'ng-model-options="{debounce: 500}"' +
                'placeholder="{{ placeholder }}" />' +
              '</div>',
    scope: {
      key: '@emKey',
      placeholder: '@emPlaceholder'
    },
    require: '^emResourceManager',
    link: function(scope, element, attrs, resourceManagerCtrl) {
      var resMgr = resourceManagerCtrl.resMgr;

      scope.filter = resMgr.filter[scope.key];

      scope.$watch('filter', function(newFilter, oldFilter) {
        if (newFilter === oldFilter) return;

        resMgr.setFilterOption(scope.key, newFilter);
      });
    }
  };
});
