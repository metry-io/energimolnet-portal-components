angular.module('app.directives')

.directive('emFormTags', ->
  return {
    template: '<div ng-class="{&quot;has-error&quot;: errors}" class="form-group"><label class="col-sm-2 control-label">{{ label }}</label><div class="col-sm-10"><tags-input ng-model="tagsModel" min-length="2" on-tag-added="onTagAdded()" on-tag-removed="onTagRemoved()"></tags-input><p ng-repeat="msg in errors" class="help-block">{{ msg }}</p></div></div>', 
    restrict: 'E'
    scope:
      model: '=emModel'
      errors: '=emErrors'
    replace: true
    link: (scope, element, attrs) ->
      # Convert array of strings to tag objects
      makeTags = (model) ->
        return (if typeof t is 'string' then {text: t} else t for t in model)

      # Convert array of tag objects to string
      makeModel = (tags) ->
        return (tag.text or tag for tag in tags)

      scope.label = attrs.emLabel

      # Upgrade any old incorrect tags
      if scope.model?
        scope.model = makeModel(scope.model)

      scope.tagsModel = if scope.model then makeTags(scope.model) else []

      scope.onTagAdded = ->
        scope.model = makeModel(scope.tagsModel)

      scope.onTagRemoved = ->
        scope.model = makeModel(scope.tagsModel)
  }
)
