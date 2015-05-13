angular.module('portal-components')

.directive('emFilterAutocomplete', [
  '$injector',
  function($injector) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="form-group" ng-class="{\'has-success\': filter.length > 0}">' +
                '<em-autocomplete ' +
                  'em-model="filter" ' +
                  'em-placeholder="{{ placeholder }}" ' +
                  'em-api-resource="Resource" ' +
                  'em-query-params="queryParams"></em-autocomplete>' +
                '</div>',
      scope: {
        key: '@emKey',
        placeholder: '@emPlaceholder',
      },
      require: '^emResourceTable',
      link: function(scope, element, attrs, resourceTableCtrl) {
        var resMgr = resourceTableCtrl.resMgr;

        scope.Resource = $injector.get('em' + attrs.emResourceName);
        scope.filter = resMgr.filter[scope.key];
        scope.queryParams = scope.$eval(attrs.emParams);

        scope.$watch('filter', function(newModel, oldModel) {
          if (newModel === oldModel) return;

          resMgr.setFilterOption(scope.key, newModel);
        });
      }
    };
  }
]);
