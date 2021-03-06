var IdData = require('../data/id-data');
var idData = require('../data');

function Store() {
  this.data = this.getDefaultData();
  this.listeners = {};
}

Store.Events = {
  RESTORE: 'restore',
  CATEGORY_CHANGED: 'category_changed',
  INSTANCE_CHANGED: 'instance_changed',
  MEMBER_CHANGED: 'member_changed',
  OPTION_CHANGED: 'option_changed',
  REQUEST_MACRO_UPDATE: 'request_macro_update'
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

p.getDefaultData = function () {
  var data = {
    category: 0,
    id: 0,
    options: {
      limit: 1,
      mount: 3
    },
    member: []
  };
  for (var i=0;i<8;i++) {
    data.member.push({
      name: '',
      item: []
    });
  }
  return data;
};

p.getOption = function (name) {
  return this.data.options[name] !== undefined ?
              this.data.options[name]:
              defaultOptions[name];
};

/**
 * 設定を保存する
 */
p.save = function () {
  var json = JSON.stringify(this.data);
  localStorage.setItem('data', json);
};

/**
 * データをクリアする
 */
p.clear = function () {
  this.data = this.getDefaultData();
  this.save();
  this.emit(Store.Events.RESTORE);
};

p._restoreData = function (data) {
  this.data.category = data.category;
  this.data.id = data.id;

  // 旧バージョンはoptionsがないのでチェック
  if (data.options) {
    for (var i in data.options) {
      this.data.options[i] = data.options[i];
    }
  }

  data.member.forEach(function (member, i) {
    this.data.member[i].name = member.name;

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
  var instances = this.getInstances();
  for (var i=0,l=instances.length;i<l;i++) {
    if (instances[i].id === this.data.id) {
      return instances[i];
    }
  }
  return null;
};

/**
 * アイテムを取得する
 */
p.getItem = function(itemId) {
  return this.getInstance().itemMap[itemId];
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
  var idData = this.getInstance();
  var selected = this.getSelectedItems(memberIndex);
  var allSelected = this.getAllSelectedItems();
  // 選択済のマウントの数を計算
  var mountCount = 0;
  if (idData.hasMount()) {
    allSelected.forEach(function (itemId) {
      var item = idData.items[itemId];
      if (item.shortName.match(/(馬|鳥)/)) {
        mountCount++;
      }
    });

  }
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
p.getAllSelectedItems = function (ignoreMemberId) {
  var member;
  var ret = [];
  for (var i=0,l=this.data.member.length;i<l;i++) {
    if (i === ignoreMemberId) {
      continue;
    }
    member = this.data.member[i];
    ret = ret.concat(member.item);
  }
  return ret;
};

p.getItemSelectedCount = function (itemId, ignoreMemberId) {
  return this.getAllSelectedItems(ignoreMemberId).filter(function (id) {
    return itemId === id;
  }).length;
};

p.getItemLimit = function (itemId) {
  var item = this.getItem(itemId);
  if (item.category === IdData.category.MOUNT) {
    return this.data.options.mount;
  } else {
    return this.data.options.limit;
  }
};

/**
 * 行き先カテゴリを設定する
 */
p.setInstanceCategory = function (category) {
  this.data.category = category;
  // インスタンスダンジョンをリセット
  this.data.id = 0;
  // 選択中アイテムをリセット
  this.data.member.forEach(function (member) {
    member.item = [];
  });
  this.save();
  this.emit(Store.Events.CATEGORY_CHANGED);
  this.emit(Store.Events.MEMBER_CHANGED);
};

/**
 * 行き先インスタンスダンジョンを設定する
 */
p.setInstance = function (instance) {
  this.data.id = instance;
  // 選択中アイテムをリセット
  this.data.member.forEach(function (member) {
    member.item = [];
  });
  this.save();
  this.emit(Store.Events.INSTANCE_CHANGED);
  this.emit(Store.Events.MEMBER_CHANGED);
};

/**
 * マウントオプション設定
 */
p.setMountOption = function (value) {
  this.data.options.mount = value;
  this.save();
  this.emit(Store.Events.OPTION_CHANGED);
};

/**
 * 制限オプション設定
 */
p.setLimitOption = function (value) {
  this.data.options.limit = value;
  this.save();
  this.emit(Store.Events.OPTION_CHANGED);
};

/**
 * メンバーの選択中アイテムを設定する
 */
p.setMemberItems = function (memberIndex, items) {
  this.data.member[memberIndex].item = items;
  this.save();
  this.emit('member_'+memberIndex+'_changed');
  this.emit(Store.Events.REQUEST_MACRO_UPDATE);
};

/**
 * メンバーの選択中アイテムを選択解除する
 */
p.removeMemberItem = function (memberIndex, itemId) {
  this.setMemberItems(memberIndex, 
    this.data.member[memberIndex].item.filter(function (id) {
      return id !== itemId;
    })
  );
};

p.setMemberName = function (memberIndex, name) {
  this.data.member[memberIndex].name = name;
  this.save();
  // memberからの更新なのでメンバーイベント送らない
  // this.emit('member_'+memberIndex+'_changed');
  this.emit(Store.Events.REQUEST_MACRO_UPDATE);
}

module.exports = new Store();
