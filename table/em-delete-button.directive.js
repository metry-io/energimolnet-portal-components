angular.module('portal-components')

.directive('emDeleteButton', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      deleteText: '@emDeleteText',
      item: '=emItem'
    },
    template: '<a href="" class="btn btn-danger" ng-click="click()">' +
                '<span class="glyphicon glyphicon-trash"></span>' +
              '</a>',
    require: '^emResourceTable',
    link: function(scope, element, attrs, resourceTableCtrl) {
      scope.click = function() {
        resourceTableCtrl.resMgr.deleteItem(scope.item, scope.deleteText);
      };
    }
  };
});
