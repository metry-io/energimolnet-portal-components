angular.module('portal-components')

.factory('emResourceManager', [
  '$timeout',
  '$modal',
  '$location',
  function($timeout, $modal,  $location) {
    function ResourceManager(Resource, filter, refreshTime, batchCallback) {
      this.Resource = Resource;
      this.refreshTime = (refreshTime === undefined) ? false : refreshTime;
      this.loading = false;
      this.data = [];
      this.pagination = {};
      this.filter = angular.extend(filter || {}, $location.search);
      this.batchMgr = undefined;
      this.batchCallback = batchCallback;

      this._refreshTimeout = undefined;
      this._lastParams = {};

      this.getData(0);
    }

    ResourceManager.prototype.setFilterOption = function setFilter(key, value) {
      this.filter[key] = value;
      this.getData(0);
      $location.search(this.filter).replace();
    };

    ResourceManager.prototype.updatePage = function updatePage() {
      this.getData(this.pagination.limit * (this.pagination.page - 1));
    };

    ResourceManager.prototype.getData = function(offset) {
      this.loading = true;
      this.data = [];
      this.pagination = {page: 1};
      this._getData(offset);
    };

    ResourceManager.prototype.refreshData = function refreshData() {
      var p = _this.pagination;
      _this._getData(p.limit ? p.limit * (p.page - 1) : 0);
    };

    ResourceManager.prototype.deleteItem = function deleteItem(item, deleteText) {
      var _this = this;

      $modal.open({
        templateUrl: 'app/components/table/modal-delete.tmpl.jade',
        controller: ['$scope', function ($scope) {
          $scope.deleteText = deleteText;
        }]
      }).result.then(function(res) {
        return _this.Resource.delete(item._id);
      }).then(function (res) {
        _this.refreshData();
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

      this.batchCallback(type, value, items, refreshData);
    };

    // Private get data function
    ResourceManager.prototype._getData = function _getData(offset) {
      var params = angular.copy(this.filter),
          _this = this;

      if (offset > 0) {
        params.skip = offset;
      }

      this.clearRefreshTimeout();
      this._lastParams = params;

      this.Resource.query(params).then(function(res) {
        if (angular.equals(params, _this._lastParams)) {
          _this.loading = false;
          _this.data = res.data;
          _this.pagination = res.pagination;
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
    ResourceManager.prototype.setRefreshTimeout = function setRefreshTimeout() {
      if (this.refreshTime && !this.refreshTimeout) {
        this.refreshTimeout = $timeout(this.refreshData.bind(this), this.refreshTime);
      }
    };

    ResourceManager.prototype.clearRefreshTimeout = function clearRefreshTimeout() {
      if (this.refreshTimeout) {
        $timeout.cancel(this.refreshTimeout);
        this.refreshTimeout = undefined;
      }
    };

    return ResourceManager;
  }
]);
