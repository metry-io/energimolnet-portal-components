angular.module('portal-components')

.run([
  '$templateCache',
  function($templateCache) {
    return $templateCache.put('delete-modal.html',
      '<div class="modal-header">' +
        '<button class="close" type="button" ng-click="$dismiss(\'close\')" aria-hidden="true">&times</button>' +
        '<h4 class="modal-title">Confirm delete</h4>' +
      '</div>' +
      '<div class="modal-body">' +
        '<p>Are you sure you want to delete <strong>{{ deleteText }}</strong></p>' +
        '<div class="form-group">' +
          '<label>Type DELETE (All caps) below to confirm</label>' +
          '<input class="form-control" type="text" ng-model="confirm" tabindex="1" autofocus />' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-default" ng-click="$dismiss(\'cancel\')">Cancel</button>' +
        '<button class="btn btn-danger" ng-click="$close()" ng-disabled="confirm !== \'DELETE\'">Delete</button>' +
      '</div>'
    );
  }
]);
