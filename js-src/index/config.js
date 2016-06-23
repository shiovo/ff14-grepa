var store = require('./store');

function Config() {
  this.categoryEl = document.querySelector('#select-category');
  this.instanceEl = document.querySelector('#select-id');

  this.category = 0;
  this.target   = 0;

  this.initBindings();
}

var p = Config.prototype;

p.initBindings = function () {
  var self = this;

  this.categoryEl.addEventListener('change', function () {
    store.setInstanceCategory(this.categoryEl.selectedIndex);
  }, false);

  this.instanceEl.addEventListener('change', function () {
    store.setInstance(this.instanceEl.selectedIndex);
  }, false);

  // storeイベント
  store.on('restore', function () {
    self.renderCategory();
    self.renderId();
  });
  store.on('instance_changed', function () {
    self.renderId();
  });
};

p.renderCategory = function () {
  var html = '';
  store.getInstanceCategories().forEach(function (category, i) {
    html += '<option value="' + i + '">' + category.name + '</option>';
  });
  this.categoryEl.innerHTML = html;
  this.categoryEl.selectedIndex = store.data.category;
};

p.renderId = function () {
  var html = '';
  store.getInstances().forEach(function (instance, i) {
    html += '<option value="' + i + '">' + instance.name + '</option>';
  });
  this.instanceEl.innerHTML = html;
  this.instanceEl.selectedIndex = store.data.id;
};

module.exports = Config;