var store = require('./store');

function Config() {
  this.categoryEl = document.querySelector('#select-category');
  this.instanceEl = document.querySelector('#select-id');

  // クリア
  this.clearEl = document.querySelector('.m-clear button');

  // オプション
  this.limitContainer = document.querySelector('#option-limit');
  this.limit = this.limitContainer.querySelector('select');

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

  this.clearEl.addEventListener('click', function () {
    store.clear();
  }, false);

  this.mount.addEventListener('change', function () {
    var value = parseInt(self.mount.value);
    if (isNaN(value)) {
      value = 1;
    }
    store.setMountOption(value);
  }, false);

  this.limit.addEventListener('change', function () {
    var value = parseInt(self.limit.value);
    if (isNaN(value)) {
      value = 1;
    }
    store.setLimitOption(value);
  }, false);

  // storeイベント
  store.on('restore', function () {
    self.renderCategory();
    self.renderId();
    self.renderOptionLimit();
  });
  store.on('category_changed', function () {
    self.renderId();
    self.renderOptionLimit();
  });
  store.on('instance_changed', function () {
    self.renderOptionLimit();
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

p.renderOptionLimit = function () {
  var idData = store.getInstance();
  var mount = idData.hasMount();
  this.limit.value = store.data.options.limit;
  this.mount.value = store.data.options.mount;
  this.mountContainer.classList.toggle('is-hide', !idData.hasMount());
  this.mountContainer.querySelector('span').innerHTML = mount || '';
};

module.exports = Config;