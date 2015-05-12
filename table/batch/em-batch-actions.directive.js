angular.module('portal-components')

.directive('emBatchActions', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="dropdown" dropdown>' +
                '<button class="btn btn-primary dropdown-toggle" dropdown-toggle style="padding: 6px">' +
                  '<input type="checkbox" ng-model="batchMgr.allSelected" ng-change="change()">' +
                  '<span class="caret" style="margin-left: 10px"></span>' +
                '<ul class="dropdown-menu" ng-transclude></ul>' +
              '</div>',
    scope: {},
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      var batchMgr = resourceTableCtrl.batchMgr;
      scope.batchMgr = batchMgr;

      scope.change = function change() {
        batchMgr.selectAll(scope.batch.allSelected);
      };
    }
  };
});
