/* Directive used in tables to show consumption for a meter
  The model scope parameter is injected by the em-expandable-row
  when this directive is created. */

angular.module('app.directives')

.directive('emConsumptionTable', [
  'emConsumptions',
  'emDateUtil',
  function(Consumptions, dateUtil) {
    return {
      restrict: 'E',
      scope: true,
      template: '<div class="em-consumption-header"><div class="btn-group" ng-if="metrics.length > 1" class="text-center"><label class="btn btn-primary btn-sm" ng-model="$parent.$parent.selectedMetric" btn-radio="\'{{metric}}\'" ng-repeat="metric in metrics">{{ metric | metricName }}</label></div></div><table ng-show="!loading && data != null" class="em-consumption-table"><thead><tr><th></th><th>jan</th><th>feb</th><th>mar</th><th>apr</th><th>maj</th><th>jun</th><th>jul</th><th>aug</th><th>sep</th><th>okt</th><th>nov</th><th>dec</th><th></th></tr></thead><tbody><tr ng-repeat="year in data[selectedMetric]"><td>{{year.year}}</td><td ng-repeat="month in year.series track by $index" ng-bind-html="::month | consumptionValue | trust"></td><td></td></tr></tbody></table><div ng-show="!loading && meter.active && data == null" style="height: 80px" class="em-flexbox em-flex-vertical em-flex-justify-center"><div class="text-center">Det finns ingen insamlad data för denna mätpunkt.</div></div><div ng-show="!meter.active" style="height: 80px" class="em-flexbox em-flex-vertical em-flex-justify-center"><div class="text-center"><p>Förbrukning kan inte visas för mätpunkter i papperskorgen.</p></div></div><div ng-show="loading" style="height: 80px" class="em-spinner-dark"></div>',
      controller: ['$scope', function($scope) {
        $scope.data = undefined;
        $scope.loading = false;
        $scope.meter = $scope.model;
        $scope.selectedMetric = 'energy';
        $scope.metrics = Object.keys($scope.meter.consumption_stats);

        function init() {
          var meter = $scope.meter;
          if (!meter.active) return;

          // Get data for all available metrics
          var startDate = new Date(), endDate = new Date(0);
          var hasStart = false, hasEnd = false;
          var stats = meter.consumption_stats;

          for (var key in stats) {
            var value = stats[key];
            var month = value.month;

            if (month.first) {
              var firstDate = dateUtil.getDate(month.first);
              if (firstDate < startDate) startDate = firstDate;
              hasStart = true;
            }

            if (month.last) {
              var lastDate = dateUtil.getDate(month.last);
              if (lastDate > endDate) endDate = lastDate;
              hasEnd = true;
            }
          }

          if (!(hasStart && hasEnd)) return;

          var range = dateUtil.getYearPeriod([startDate, endDate]);
          $scope.loading = true;

          Consumptions.get(meter._id, 'month', [range], meter.metrics)
            .then(function(consumptions) {
              $scope.loading = false;
              if (!consumptions[0].periods[0]) return;

              var data = {};
              var startYear = startDate.getFullYear();
              var endYear = endDate.getFullYear();

              $scope.metrics.forEach(function(metric) {
                data[metric] = [];
                var values = consumptions[0].periods[0][metric];
                var metricStartDate = dateUtil.getDate(stats[metric].month.first);
                var metricEndDate = dateUtil.getDate(stats[metric].month.last);

                if (!values || values.length === 0 ||
                    !metricStartDate || !metricEndDate) return;

                // The metric's data availability boundaries
                var firstYear = metricStartDate.getFullYear();
                var lastYear = metricEndDate.getFullYear();

                // Sort data into years, and remove null values outside of bounds
                for (var i = 0, l = (endYear - startYear); i <= l; i++) {
                  var year = startYear  + i;
                  var series = values.slice(i * 12, (i * 12) + 12);

                  if (year < firstYear) {
                    for (var j = 0, k = series.length; j <= k; j++) {
                      if (series[j] === null) series[j] = undefined;
                    }
                  } else if (year === firstYear) {
                    for (var j = 0, k = (metricStartDate.getMonth()); j <= k; j++) {
                      if (series[j] === null) series[j] = undefined;
                    }
                  }

                  if (year === lastYear) {
                    for (var m = (metricEndDate.getMonth()); m < 12; m++) {
                      if (series[m] === null) series[m] = undefined;
                    }
                  } else if (year > lastYear) {
                    for (var j = 0, k = series.length; j <= k; j++) {
                      if (series[j] === null) series[j] = undefined;
                    }
                  }

                  data[metric].push({
                    year: year,
                    series: series
                  });
                }
              });

              $scope.data = data;
            });
        }

        init();
      }]
    };
  }
]);
