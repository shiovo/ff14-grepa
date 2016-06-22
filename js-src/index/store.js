var idData = require('../data');

function Store() {
  this.data = {
    category: 0,
    id: 0,
    options: {
      bird: 0
    },
    member: []
  };
  for (var i=0;i<8;i++) {
    this.data.member.push({
      name: '',
      item: []
    });
  }

  this.listeners = {};
}

Store.Events = {
  RESTORE: 'restore',
  ITEM_SELECTED: 'item_selected'
};

var p = Store.prototype;

p.on = function (name, fn) {
  var listeners = this.listeners[name] || (this.listeners[name] = []);
  listeners.push(fn);
};

p.emit = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  var listeners = this.listeners[name];
  if (listeners) {
    listeners.forEach(function (fn) {
      fn.apply(null, args);
    });
  }
};

p.restore = function () {
  var json = localStorage.getItem('data');
  if (json) {
    var data = JSON.parse(json);
    this._restoreData(data);
  }
  this.emit(Store.Events.RESTORE);
};

p._restoreData = function (data) {
  this.data.category = data.category;
  this.data.id = data.id;

  // 旧バージョンはoptionsがないのでチェック
  if (data.options) {
    this.data.options = data.options;
  }

  data.member.forEach(function (member, i) {
    if (Array.isArray(member.item)) {
      // 現バージョンデータはそのまま設定
      this.data.member[i].item = member.item;
    } else if (member.selected) {
      // 旧バージョンは数値型なので選択済みフラグの場合のみ設定
      this.data.member[i].item.push(member.item);
    }
  }, this);
};

/**
 * 行き先カテゴリを取得する
 */
p.getInstanceCategories = function () {
  return idData;
};

/**
 * 行き先カテゴリのダンジョンリストを取得する
 */
p.getInstances = function () {
  return idData[this.data.category].ids;
};

/**
 * 行き先ダンジョンを取得する
 */
p.getInstance = function () {
  return this.getInstances()[this.data.id];
};

/**
 * メンバーの選択中アイテムを設定する
 */
p.setSelectedItems = function (memberIndex, items) {
  this.data.member[memberIndex].item = items;
  this.emit(Store.Events.ITEM_SELECTED, memberIndex);
};

/**
 * メンバーの選択中アイテムを取得する
 */
p.getSelectedItems = function (memberIndex) {
  return this.data.member[memberIndex].item;
};

/**
 * メンバーの選択できないアイテムを取得する
 */
p.getUnSelectableItems = function (memberIndex) {
  var selected = this.getSelectedItems(memberIndex);
  var allSelected = this.getAllSelectedItems();
  var ret = [];
  allSelected.forEach(function (itemId) {
    // 自分の選択アイテムでなければ選択不可
    if (selected.indexOf(itemId) < 0) {
      ret.push(itemId);
    }
  });
  return ret;
};

/**
 * すべてのメンバーの選択中アイテムを取得する
 */
p.getAllSelectedItems = function () {
  var member;
  var ret = [];
  for (var i in this.data.member) {
    member = this.data.member[i];
    ret = ret.concat(member.item);
  }
  return ret;
};

module.exports = new Store();
