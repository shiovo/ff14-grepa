var data = require('../data');

function SelectTarget(categoryEl, targetEl) {
  this.categoryEl = categoryEl;
  this.targetEl   = targetEl;

  this.category = 0;
  this.target   = 0;

  this.init();
}

var p = SelectTarget.prototype;

p.init = function () {
  // カテゴリ選択肢をセット
  var options = '';
  data.forEach(function (category, i) {
    options += '<option value="'+i+'">'+category.name+'</option>';
  });
  this.categoryEl.innerHTML = options;
  this.categoryEl.selectedIndex = 0;
};

p.getTargets = function () {
  return data[this.category];
};

p.getTargetItems = function () {
  return data[this.category].ids[this.target].items;
}

p.setCategory = function (category) {
  this.category = category;
  this.categoryEl.selectedIndex = category;

  // 行き先の選択肢を更新
  this.updateTargetOptions();
};

p.updateTargetOptions = function () {
  var targets = this.getTargets();
  var options = '';
  targets.forEach(function (id, i) {
    options += '<option value="'+i+'">'+id.name+'</option>';
  });
  this.targetEl.innerHTML = options;
  this.targetEl.selectedIndex = 0;
};

