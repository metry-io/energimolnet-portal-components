angular.module('portal-components')

.directive('emPagination', function() {
  return {
    restrict: 'E',
    template: '<div class="text-center" ng-show="!resMgr.loading">' +
              '<pagination boundary-links="true" ng-model="resMgr.pagination.page" ng-change="resMgr.updatePage()" total-items="resMgr.pagination.count" items-per-page="resMgr.pagination.limit" max-size="10">' +
              '<p>Showing {{ resMgr.pagination.from }} to {{ resMgr.pagination.to }} of {{ resMgr.pagination.count }}</p>' +
              '</div>',
    scope: {
      resMgr: '=emResourceManager'
    }
  };
});
