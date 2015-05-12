angular.module('energimolnet.ui')

.directive('emHeader', function() {
  return {
    restrict: 'E',
    template: '<div class="heder" ng-if="::sort">' +
                '<a href="" ng-click="toggleSort()" title="{{ title }}" tabindex="-1">{{ title }}&nbsp;' +
                  '<span class="glyphicon glyphicon-triangle-top small" ng-show="resMgr.filter.sort === sort">' +
                  '<span class="glyphicon glyphicon-triangle-bottom small" ng-show="resMgr.filter.sort === \'-\' + sort">' +
                '</a>' +
              '</div>' +
              '<div class="header" ng-if="::!resMgr.filter.sort", title="{{ title }}">{{ title }}</div>',
    scope: {
      sort: '@emSort',
      title: '@emTitle',
    },
    require: '^emResourceManager',
    link: function(scope, element, attrs, resourceManagerCtrl) {
      var resMgr = resourceManagerCtrl.resMgr;
      scope.resMgr = resMgr;

      scope.toggleSort = function() {
        var currentSort = resMgr.filter.sort;
        var newSort = (currentSort === scope.sort) ? '-' + scope.sort : scope.sort;
        resMgr.setFilterOption('sort', newSort);
      };
    }
  };
});
