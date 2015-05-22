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
      template: '<table ng-show="!loading &amp;&amp; data.length &gt; 0" class="em-consumption-table"><thead><tr><th></th><th>jan</th><th>feb</th><th>mar</th><th>apr</th><th>maj</th><th>jun</th><th>jul</th><th>aug</th><th>sep</th><th>okt</th><th>nov</th><th>dec</th><th></th></tr></thead><tbody><tr ng-repeat="year in ::data"><td>{{year.year}}</td><td ng-repeat="month in year.series track by $index" ng-bind-html="::month | consumptionValue | trust"></td><td></td></tr></tbody></table><div ng-show="!loading &amp;&amp; meter.active &amp;&amp; data == null" style="height: 80px" class="em-flexbox em-flex-vertical em-flex-justify-center"><div class="text-center">Det finns ingen insamlad data för denna mätpunkt.</div></div><div ng-show="!meter.active" style="height: 80px" class="em-flexbox em-flex-vertical em-flex-justify-center"><div class="text-center"><p>Mätpunkten är inaktiverad. Insamling garanteras endast för aktiva mätpunkter.<br>Klicka på den gröna redigera-knappen till höger för att aktivera mätpunkten.</p></div></div><div ng-show="loading" style="height: 80px" class="em-spinner-dark"></div>',
      link: function(scope, element, attrs) {
        scope.data = undefined;
        scope.loading = false;
        scope.meter = scope.model;

        var available = scope.meter.consumption_stats.energy.month;

        if (!scope.meter.active ||
            available === null || available === undefined ||
            available.first === null ||
            available.last === null)
          return;

        var bounds = {
          start: dateUtil.getDate(available.first.toString()),
          end: dateUtil.getDate(available.last.toString())
        };

        var range = dateUtil.getYearPeriod([bounds.start, bounds.end]);
        scope.loading = true;

        Consumptions.get(scope.meter._id, 'month', [range])
          .then(function(consumptions) {
            scope.loading = false;

            if (!consumptions[0].periods[0]) return;

            var values = consumptions[0].periods[0].energy;
            if (values.length === 0) return;

            var firstYear = bounds.start.getFullYear();
            var lastYear = bounds.end.getFullYear();
            var data = [];

            // Sort data into years, and remove null values outside of bounds
            for (var i = 0, l = (bounds.end.getFullYear() - firstYear); i <= l; i++) {
              var year = firstYear + i;
              var series = values.slice(i * 12, (i * 12) + 12);

              if (year === firstYear) {
                for (var j = 0, k = (bounds.start.getMonth()); j <= k; j++) {
                  if (series[j] === null) series[j] = undefined;
                }
              }

              if (year === lastYear) {
                for (var m = (bounds.end.getMonth()); m < 12; m++) {
                  if (series[m] === null) series[m] = undefined;
                }
              }

              data.push({
                year: year,
                series: series
              });
            }

            scope.data = data;
          });
      }
    };
  }
])
