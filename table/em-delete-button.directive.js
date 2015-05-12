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
    require: '^emResourceManager',
    link: function(scope, element, attrs, resourceManagerCtrl) {
      scope.click = function() {
        resourceManagerCtrl.deleteItem(scope.item, scope.deleteText);
      };
    }
  };
});
