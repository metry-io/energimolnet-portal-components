angular.module('app.directives')

.directive('emExpandableRow', [
  '$compile',
  '$document',
  '$rootScope',
  function($compile, $document, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        contentDirective: '@emExpandableRow',
        expandableIf: '=emExpandableIf',
        model: '=emModel'
      },
      link: function(scope, element, attrs) {
        scope.expanded = false;
        var contentRow = element.next().children().eq(0);

        element.on('click', function(event) {
          if (!scope.expandableIf) return;

          element.toggleClass('em-expanded');
          contentRow.toggleClass('em-expanded');

          if (scope.expanded) {
            contentRow.children().remove();
          } else {
            scope.$apply(function() {
              var type = scope.contentDirective || 'div';
              var contentDir = $compile($document[0].createElement(type))(scope);
              contentRow.append(contentDir);
            });
          }

          scope.expanded = !scope.expanded;
        });
      }
    };
  }
]);
