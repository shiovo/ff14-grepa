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

module.exports = IdData;
