angular.module('portal-components')

.filter('metricName', function() {
  return function(value) {
    var name = {
      energy: 'Energi',
      flow: 'Flöde'
    }[value];

    return name || 'Energi';
  };
});

