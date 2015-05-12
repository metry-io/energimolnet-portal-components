angular.module('energimolnet.ui')

.factory('emBatchManager', function() {
  function BatchUpdateManager (length, changeCallback) {
    this.reset(length);
    this.changeCallback = changeCallback;
  }

  function makeCheckboxArray(length) {
    var checkboxArray = new Array(length);
    for (var i = 0; i < length; i++) checkboxArray[i] = false;
    return checkboxArray;
  }

  BatchUpdateManager.prototype.reset = function reset(length) {
    if (length == null) length = 0;

    this.selected = makeCheckboxArray(length);
    this.allSelected = false;

    if (this.changeCallback) this.changeCallback(this.selected);
  };

  BatchUpdateManager.prototype.isSelected = function isSelected(index) {
    return this.selected[index] === true;
  };

  BatchUpdateManager.prototype.select = function select(index, selected) {
    this.selected[index] = selected;
    this.allSelected = true;

    for (var i = 0, l = this.selected.length; i < l; i++) {
      if (this.selected[i] === false) {
        this.allSelected = false;
        break;
      }
    }

    if (this.changeCallback) this.changeCallback(this.selected);
  };

  BatchUpdateManager.prototype.selectAll = function selectAll(selected) {
    this.allSelected = selected;

    for (var i = 0, l = this.selected.length; i < l; i++) {
      this.selected[i] = selected;
    }

    if (this.changeCallback) this.changeCallback(this.selected);
  };

  return BatchUpdateManager;
});
