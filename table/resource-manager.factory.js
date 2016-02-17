angular.module('portal-components')

.factory('emResourceManager', [
  '$timeout',
  '$modal',
  '$location',
  function($timeout, $modal,  $location) {
    function ResourceManager(Resource, filter, refreshTime, batchCallback, preventSearchUpdate) {
      this.Resource = Resource;
      this.refreshTime = (refreshTime === undefined) ? false : refreshTime;
      this.loading = false;
      this.data = [];
      this.pagination = {};
      this.preventSearchUpdate = preventSearchUpdate;

      this.filter = angular.copy(filter);

      if (!preventSearchUpdate) {
        this.filter = angular.extend(filter || {}, $location.search());
      }

      this.batchMgr = undefined;
      this.batchCallback = batchCallback;

      this._refreshTimeout = undefined;
      this._lastParams = {};

      this.getData();
    }

    ResourceManager.prototype.setFilterOption = function setFilter(key, value) {
      this.filter[key] = value;
      this.filter.skip = 0;

      if (!this.preventSearchUpdate) {
        $location.search(this.filter).replace();
      }

      this.getData();
    };

    ResourceManager.prototype.updatePage = function updatePage() {
      this.filter.skip = this.pagination.limit * (this.pagination.page - 1);

      if (!this.preventSearchUpdate) {
        $location.search(this.filter).replace();
      }

      this.getData();
    };

    ResourceManager.prototype.getData = function() {
      this.loading = true;
      this.data = [];
      this.pagination = {page: 1};
      this._getData();
    };

    ResourceManager.prototype.deleteItem = function deleteItem(item, deleteText) {
      var _this = this;

      $modal.open({
        templateUrl: 'delete-modal.html',
        controller: ['$scope', function ($scope) {
          $scope.deleteText = deleteText;
        }]
      }).result.then(function(res) {
        return _this.Resource.delete(item._id);
      }).then(function (res) {
        _this._getData();
      });
    };

    ResourceManager.prototype.runBatchAction = function runBatchAction(type, value) {
      // TODO: This should rather be handled by resource directly, i.e. Meters.batch()
      if (!this.batchCallback || !this.batchMgr) return;

      var _this = this;
      var items = this.data.filter(function(item, index) {
        return _this.batchMgr.isSelected(index);
      });

      if (items.length === 0) return;

      this.batchCallback(type, value, items);
    };

    // Private get data function
    ResourceManager.prototype._getData = function _getData() {
      var params = angular.copy(this.filter),
          _this = this;

      this.clearRefreshTimeout();
      this._lastParams = params;

      this.Resource.query(params).then(function(res) {
        if (angular.equals(params, _this._lastParams)) {
          _this.loading = false;
          _this.data = res.data || res;
          _this.pagination = res.pagination || {page: 1};
          _this.setRefreshTimeout();

          if (_this.batchMgr) {
            _this.batchMgr.reset(res.data.length);
          }
        }
      }, function(err) {
        if (angular.equals(params, _this._lastParams)) {
          _this.loading = false;
          _this.data = [];
          _this.pagination = {};

          if (_this.batchMgr) {
            _this.batchMgr.reset(0);
          }
        }
      });
    };

    // Refresh data
    ResourceManager.prototype.refresh = function refresh() {
      this._getData();
    };

    ResourceManager.prototype.setRefreshTimeout = function setRefreshTimeout() {
      if (this.refreshTime && !this._refreshTimeout) {
        var _this = this;

        this._refreshTimeout = $timeout(function() {
          if (!_this.refreshTime) return;
          _this.refresh();
        }, this.refreshTime);
      }
    };

    ResourceManager.prototype.clearRefreshTimeout = function clearRefreshTimeout() {
      if (this._refreshTimeout) {
        $timeout.cancel(this._refreshTimeout);
        this._refreshTimeout = undefined;
      }
    };

    return ResourceManager;
  }
]);
