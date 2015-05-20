angular.module('portal-components')

.directive('emPagination', function() {
  return {
    restrict: 'E',
    template: '<div class="text-center" ng-show="!resMgr.loading">' +
              '<pagination boundary-links="true" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;" ng-model="resMgr.pagination.page" ng-change="resMgr.updatePage()" total-items="resMgr.pagination.count" items-per-page="resMgr.pagination.limit" max-size="10"></pagination>' +
              '<p ng-if=":: ctrl.lang === \'en\'">Showing from {{ resMgr.pagination.from }} to {{ resMgr.pagination.to }} of {{ resMgr.pagination.count }} matching</p>' +
              '<p ng-if=":: ctrl.lang === \'sv\'">Visar från {{ resMgr.pagination.from }} till {{ resMgr.pagination.to }} av {{ resMgr.pagination.count }} matchande</p>' +
              '</div>',
    scope: {
      resMgr: '=emResourceManager'
    },
    controller: ['uiLanguage', function(uiLanguage) {
      this.lang = uiLanguage;
    }],
    controllerAs: 'ctrl'
  };
});
