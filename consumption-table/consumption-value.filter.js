angular.module('portal-components')

.filter('consumptionValue', function() {
  return function(value) {
    if (value === undefined) return '-';
    if (value === null) return '<span class="label label-danger">saknas</span>';
    return '' + Math.floor(value);
  };
});
