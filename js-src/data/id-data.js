var roles = require('./role');

function IdData(data) {
  this.id          = null;
  this.name        = null;
  this.items       = [];
  this.itemMap     = {};
  this.categories  = [];
  this.categoryMap = {};

  this.setData(data);
}

IdData.categoryMap = {
  0: {
    id: 0,
    name: '武器'
  },
  1: {
    id: 1,
    name: '防具'
  },
  2: {
    id: 2,
    name: 'アクセサリー'
  },
  3: {
    id: 3,
    name: '強化素材'
  },
  4: {
    id: 4,
    name: 'マウント'
  },
  99: {
    id: 99,
    name: 'ジョブ・ロール'
  }
};

IdData.category = {
  MOUNT: 4
};

var p = IdData.prototype;

p.setData = function (data) {
  this.id    = data.id;
  this.name  = data.name;

  this.items = data.items;

  this.items.forEach(function (item) {
    // アイテムMAP
    this.itemMap[item.id] = item;

    // カテゴリ
    var category = this.categoryMap[item.category];
    if (!category) {
      var categoryData = IdData.categoryMap[item.category];
      category = this.categoryMap[item.category] = {
        id: categoryData.id,
        name: categoryData.name,
        items: [],
        itemIds: []
      };
      this.categoryMap[category.id] = category;
      this.categories.push(category);
    }

    category.items.push(item);
    category.itemIds.push(item.id);
  }, this);

  // 装備の出るダンジョンはロール追加
  if (this.categoryMap[1] || this.categoryMap[2] || this.categoryMap[3]) {
    var categoryId = 99;
    var category = {
      id: categoryId,
      name: IdData.categoryMap[categoryId].name,
      items: [],
      itemIds: []
    };
    this.categories.push(category);
    this.categoryMap[category.id] = category;
    roles.forEach(function (role) {
      var item = {};
      for (var key in role) {
        item[key] = role[key];
      }
      category.items.push(item);
      category.itemIds.push(item.id);
      this.items.push(item);
      this.itemMap[item.id] = item;
    }, this);
  }
};

p.getItem = function (itemId) {
  return this.itemMap[itemId];
};

p.hasMount = function () {
  return !!this.categoryMap[4];
};

p.getMount = function () {
  if (this.hasMount()) {
    return this.categoryMap[4].items[0];
  }
  return null;
};

p.resolveItemName = function (itemIds) {
  if (!itemIds.length) {
    return [];
  }
  var ret = [];
  var nameMap = {};
  itemIds.forEach(function (id) {
    var item = this.getItem(id);
    var name = nameMap[item.id];
    if (!name) {
      name = nameMap[item.id] = {
        name: item.name,
        shortName: item.shortName,
        count: 0
      };
      ret.push(name);
    }
    name.count++;
  }, this)
  return ret;
};

module.exports = IdData;
