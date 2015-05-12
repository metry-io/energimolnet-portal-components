# Autocompletes a model in Energimolnet and sets its id to the passed-in
# model object

angular.module('app.directives').directive('emAutocomplete', [
  'energimolnetAPI'
  (energimolnetAPI) ->
    return {
      restrict: 'E'
      templateUrl: 'app/components/em-autocomplete.directive.tmpl.jade'
      scope:
        model: '=emModel'
        placeholder: '@emPlaceholder'
        apiResource: '&emApiResource'
        queryParams: '=emQueryParams'
        displayKey: '@emDisplayKey'
        queryKey: '@emQueryKey'
      link: (scope, element, attrs) ->
        DISPLAY_KEY_DEFAULT = 'name'
        ID_KEY = '_id'

        scope.value = undefined
        scope.options = []
        scope.displayKey = DISPLAY_KEY_DEFAULT if not scope.displayKey?
        scope.queryKey = scope.queryKey or 'name'

        Resource = scope.apiResource()

        scope.getOptions = (query) ->
          params = if scope.queryParams then angular.copy(scope.queryParams) else {}
          params[scope.queryKey] = query
          params.sort = name

          Resource.query(params).then (res) ->
            scope.options = res.data

        scope.selectOption = (option) ->
          scope.model = option?[ID_KEY]

        scope.clear = (event) ->
          event.preventDefault()
          event.stopPropagation()
          scope.selectOption(undefined)
          scope.value = undefined

        scope.onBlur = (event) ->
          if not scope.model?
            event.target.value = ''
          return true

        if scope.model?.length > 0
          Resource.get(scope.model).then (resource) ->
            scope.value = resource
    }
])
