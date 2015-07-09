angular.module('portal-components')

.directive('emAutocomplete', function() {
  return {
    restrict: 'E',
    template: '<div style="position:relative"><input type="text" autocomplete="off" ng-model="value" ng-blur="onBlur($event)" placeholder="{{ placeholder }}" typeahead="value[displayKey || \'name\'] for value in getOptions($viewValue)" typeahead-editable="false" typeahead-on-select="selectOption($item)" typeahead-wait-ms="300" class="form-control"/><div ng-show="value" class="em-clear-button"><a ng-click="clear($event)"><span class="glyphicon glyphicon-remove"></span></a></div></div>',
    scope: {
      model: '=emModel',
      placeholder: '@emPlaceholder',
      apiResource: '&emApiResource',
      queryParams: '=emQueryParams',
      displayKey: '@emDisplayKey',
      queryKey: '@emQueryKey'
    },
    link: function(scope, element, attrs) {
      scope.value = undefined;

      scope.getOptions = function(query) {
        var params = scope.queryParams ? angular.copy(scope.queryParams) :  {};
        params[scope.queryKey || 'name'] = query;
        params.sort = name;

        return scope.apiResource().query(params).then(function(res) {
          return res.data;
        });
      };

      scope.selectOption = function(option) {
        scope.model = option ? option._id : undefined;
      };

      scope.clear = function(event) {
        event.preventDefault();
        event.stopPropagation();
        scope.selectOption(undefined);
        scope.value = undefined;
      };

      scope.onBlur = function(event) {
        if (!scope.model) {
          event.target.value = '';
        }

        return true;
      };

      scope.$watch('model', function(newModel, oldModel) {
        if (scope.value || !newModel) return;

        scope.apiResource().get(scope.model).then(function(resource) {
          scope.value = resource;
        });
      });
    }
  };
});
