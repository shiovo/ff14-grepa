var store = require('./store');

function SelectItemModal(el) {
  var self = this;

  this.el = el;
  this.itemsContainer = this.el.querySelector('.select-item-modal__items tbody');
  this.memberIndex = null;

  this.el.addEventListener('click', function (e) {
    if (e.target.classList.contains('js-dismiss')) {
      self.hide();
    } else if (e.target.classList.contains('js-close')) {
      self.applySelect();
      self.hide();
    }

  }, false);
}

var p = SelectItemModal.prototype;

p.applySelect = function () {
  store.setSelectedItems(this.memberIndex, this.getSelectedItems());
};

p.render = function () {
  // アイテムを描画
  var html = '';
  var instance = store.getInstance();
  if (instance.hasCategory) {
    html = this._renderCategoryTable(instance);
  } else {
    html = this._renderBasicTable(instance);
  }
  this.itemsContainer.innerHTML = html;

  // 選択中
  store.getSelectedItems(this.memberIndex).forEach(function (id) {
    var itemImg = this.itemsContainer.querySelector('[data-item-id="'+id+'"]');
    itemImg.classList.add('is-selected');
  }, this);

  // 選択不可
  store.getUnSelectableItems(this.memberIndex).forEach(function (id) {
    var itemImg = this.itemsContainer.querySelector('[data-item-id="'+id+'"]');
    itemImg.classList.add('is-disabled');
  }, this);
};

p._renderBasicTable = function (instance) {
  var html = '';
  instance.items.forEach(function (item, i) {
    html += '<tr><td>'+(this._renderItem(item, i))+'</td></tr>';
  }, this);
  return html;
};

p._renderCategoryTable = function (instance) {
  var html = '';
  instance.categories.forEach(function (category) {
    html += '<tr><th>'+(this._renderCategoryButton(category))+'</th><td>';
    category.items.forEach(function (item) {
      html += this._renderItem(item.item, item.id, item.name);
    }, this);
    html += '</td></tr>';
  }, this);
  return html;
};

p._renderItem = function (item, id, displayName) {
  return '<div class="select-item-modal__item" data-item-id="'+id+'">'+
          '<div class="select-item-modal__itemImg"><img src="'+item.icon+'"></div>'+
          '<span class="select-item-modal__itemName">'+(displayName || item.shortName)+'</span>'+
         '</div>';
};

p._renderCategoryButton = function (category) {
  if (category.name) {
    return '<button class="btn-text">'+category.name+'</button>';
  } else {
    return '';
  }
};

p.show = function (memberIndex) {
  if (this.memberIndex !== memberIndex) {
    this.memberIndex = memberIndex;
    this.render();
  }
  this.el.classList.add('is-active');
};

p.hide = function () {
  this.el.classList.remove('is-active');
};

module.exports = SelectItemModal;
