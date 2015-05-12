angular.module('app.directives')

.directive('emFormTags', ->
  return {
    templateUrl: 'app/components/form/em-form-tags.directive.tmpl.jade'
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
