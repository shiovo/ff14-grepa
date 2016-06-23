var store = require('./store');

function Config() {
  this.categoryEl = document.querySelector('#select-category');
  this.instanceEl = document.querySelector('#select-id');

  // オプション
  this.mountContainer = document.querySelector('#option-mount');
  this.mount = this.mountContainer.querySelector('select');

  this.initBindings();
}

var p = Config.prototype;

p.initBindings = function () {
  var self = this;

  this.categoryEl.addEventListener('change', function () {
    store.setInstanceCategory(self.categoryEl.selectedIndex);
  }, false);

  this.instanceEl.addEventListener('change', function () {
    store.setInstance(self.instanceEl.selectedIndex);
  }, false);

  this.mount.addEventListener('change', function () {
    var value = parseInt(self.mount.value);
    if (isNaN(value)) {
      value = 1;
    }
    store.setMountOption(value);
  }, false);

  // storeイベント
  store.on('restore', function () {
    self.renderCategory();
    self.renderId();
    self.renderOptionMount();
  });
  store.on('category_changed', function () {
    self.renderId();
    self.renderOptionMount();
  });
  store.on('instance_changed', function () {
    self.renderOptionMount();
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

p.renderOptionMount = function () {
  var idData = store.getInstance();
  this.mount.value = store.data.options.mount;
  this.mountContainer.classList.toggle('is-hide', !idData.hasMount());
};

module.exports = Config;