angular.module('portal-components')

.directive('emBatchCheckbox', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="em-batch-checkbox">' +
                '<input type="checkbox" ng-model="items[index]" ng-change="change()">' +
              '</div>',
    scope: {
      index: '=emIndex'
    },
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      var batchMgr = resourceTableCtrl.batchMgr;

      scope.items = batchMgr.selected;

      scope.change = function() {
        batchMgr.select(scope.index, scope.items[scope.index]);
      };
    }
  };
});
