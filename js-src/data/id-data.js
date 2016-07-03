function IdData(data) {
  this.name       = null;
  this.items      = [];
  this.categories = [];

  this.setData(data);
}

var p = IdData.prototype;

p.setData = function (data) {
  this.name  = data.name;
  this.items = data.items.filter(function (item) {
    return item.shortName !== '無';
  });

  var categories = {};
  this.categories = [];
  this.hasCategory = false;
  this.items.forEach(function (item, i) {
    var cat = this.getCagetoryByShortName(item.shortName);
    var category = categories[cat.categoryName];
    if (!category) {
      category = categories[cat.category] = {
        category: cat.category,
        name: cat.categoryName,
        items: []
      };
      this.categories.push(category);
    }
    if (cat.categoryName) {
      this.hasCategory = true;
    }
    category.items.push({
      id: i,
      item: item,
      name: cat.itemName
    });
  }, this);

  this.itemCategoryMap = {};
  if (this.hasCategory) {
    this.categories.forEach(function (category, i) {
      category.items.forEach(function (item) {
        this.itemCategoryMap[item.id] = i;
      }, this);
    }, this);
  }
};

p.getCagetoryByShortName = function (name) {
  var match;
  var category;
  var regParts = /(頭|胴|手|腰|脚|足|首|耳|腕|指)$/;
  if (match = name.match(regParts)) {
    category = name.replace(regParts, '')
    return {
      category: category,
      categoryName: category,
      itemName: match[1]
    };
  }

  return {
    category: name,
    categoryName: '',
    itemName: name
  };
};

p.getItem = function (itemId) {
  return this.items[itemId];
};

p.hasMount = function () {
  var match;
  for (var i=0,l=this.items.length;i<l;i++) {
    if (match = this.items[i].shortName.match(/(馬|鳥)/)) {
      return match[0];
    }
  }
  return false;
}

p.resolveItemName = function (itemIds) {
  if (!itemIds.length) {
    return [];
  }

  var result = [];
  // カテゴリがある場合、カテゴリ内すべて選択されていれば、カテゴリ名でまとめる
  if (this.hasCategory) {
    // カテゴリごとにアイテムを分ける
    var itemsByCategory = [];
    var itemsByCategoryMap = {};
    itemIds.forEach(function (itemId) {
      var categoryId = this.itemCategoryMap[itemId];
      var category = this.categories[categoryId];
      var itemCategory = itemsByCategoryMap[category.category];
      if (!itemCategory) {
        itemCategory = itemsByCategoryMap[category.category] = {
          category: category,
          items: []
        };
        itemsByCategory.push(itemCategory);
      }
      itemCategory.items.push(itemId);
    }, this);
    // カテゴリ単位で処理
    itemsByCategory.forEach(function (itemCategory) {
      // カテゴリ内の選択アイテム数とカテゴリ内の全アイテム数が同じ場合=カテゴリ選択の場合
      if (itemCategory.items.length === itemCategory.category.items.length) {
        // カテゴリ名でまとめる
        result.push(itemCategory.category.name);
      } else {
        // カテゴリ名＋表示名でまとめる
        var dispNames = [];
        console.log(itemCategory);
        itemCategory.category.items.forEach(function (item) {
          if (itemCategory.items.indexOf(item.id) >= 0) {
            dispNames.push(item.name);
          }
        });
        result.push(itemCategory.category.name + dispNames.join('/'));
      }
    }, this);
  } else {
    itemIds.forEach(function (itemId) {
      result.push(this.getItem(itemId).shortName);
    }, this);
  }
  return result;
};

module.exports = IdData;
