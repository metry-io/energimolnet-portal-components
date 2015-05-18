angular.module('portal-components')

.directive('emResourceTable', function() {
  return {
    restrict: 'A',
    scope: {
      resMgr: '=emResourceManager',
      batchMgr: '=?emBatchManager'
    },
    controller: ['$scope', function($scope) {
      this.resMgr = $scope.resMgr;

      if ($scope.batchMgr) {
        this.batchMgr = $scope.batchMgr;
        this.resMgr.batchMgr = this.batchMgr;
      }
    }]
  };
});
