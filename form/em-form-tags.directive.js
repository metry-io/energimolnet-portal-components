angular.module('app.directives')

.directive('emFormTags', function() {
  return {
    template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><tags-input ng-model="tagsModel" min-length="2" on-tag-added="onTagAdded()" on-tag-removed="onTagRemoved()"></tags-input><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>', 
    restrict: 'E',
    scope: {
      model: '=emModel',
      errors: '=emErrors'
    },
    replace: true,
    link: function(scope, element, attrs) {
      // Convert array of strings to tag objects
      function makeTags(model) {
        return model.map(function(tag) {
          return (typeof tag === 'string') ? {text: tag} : tag;
        });
      }

      // Convert array of tag objects to string
      function makeModel(tags) {
        return tags.map(function(tag) {
          return tag.text || tag;
        });
      }

      scope.label = attrs.emLabel;

      // Upgrade any old incorrect tags
      if (scope.model) scope.model = makeModel(scope.model);

      scope.tagsModel = scope.model ? makeTags(scope.model) : [];

      scope.onTagAdded = function() {
        scope.model = makeModel(scope.tagsModel);
      };

      scope.onTagRemoved = function() {
        scope.model = makeModel(scope.tagsModel);
      };
    }
  };
});
