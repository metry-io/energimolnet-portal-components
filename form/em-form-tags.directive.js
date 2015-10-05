angular.module('app.directives')

.directive('emFormTags', function() {
  return {
    template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><tags-input ng-model="tagsModel" min-length="2" on-tag-added="onTagChanged()" on-tag-removed="onTagChanged()"></tags-input><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>',
    restrict: 'E',
    scope: {
      model: '=emModel',
      errors: '=emErrors'
    },
    replace: true,
    link: function(scope, element, attrs) {
      var ignoreModelChanged = false;

      scope.label = attrs.emLabel;

      scope.onTagChanged = function() {
        ignoreModelChanged = true;
        scope.model = makeModel(scope.tagsModel);
      };

      scope.$watch('model', function(newModel, oldModel) {
        if (!ignoreModelChanged) {
          scope.tagsModel = newModel ? makeTags(newModel) : [];
        } else {
          ignoreModelChanged = false;
        }
      });

      // Convert array of strings to tag objects
      function makeTags(model) {
        return model.map(function(tag) {
          return (typeof tag === 'string') ? {text: tag} : tag;
        });
      }

      // Convert array of tag objects to string
      function makeModel(tags) {
        return tags.map(function(tag) { return tag.text || tag; });
      }
    }
  };
});
