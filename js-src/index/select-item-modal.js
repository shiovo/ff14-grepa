var store = require('./store');

function SelectItemModal() {
  this.el = document.querySelector('.select-item-modal');
  this.itemsContainer = this.el.querySelector('.select-item-modal__items tbody');
  this.memberIndex = null;

  this.initBinding();
}

var p = SelectItemModal.prototype;

/**
 * イベントハンドル
 */
p.initBinding = function () {
  var self = this;

  this.el.addEventListener('click', function (e) {
    // キャンセル
    if (e.target.classList.contains('js-dismiss')) {
      self.hide();
    }
    // 決定
    else if (e.target.classList.contains('js-close')) {
      self.applySelect();
      self.hide();
    }
    // 選択・選択解除
    else if (e.target.parentElement.classList.contains('select-item-modal__itemImg')) {
      var item = e.target.parentElement.parentElement;
      item.classList.toggle('is-selected');
    }
    // カテゴリのアイテム全て選択・選択解除
    else if (e.target.classList.contains('js-category-select')) {
      var items = e.target.parentElement.nextElementSibling.querySelectorAll('[data-item-id]');
      var selectAll = false;
      // 未選択アイテムがあるかチェック
      for (var i=0,l=items.length;i<l;i++) {
        if (!items[i].classList.contains('is-disabled') && !items[i].classList.contains('is-selected')) {
          selectAll = true;
          break;
        }
      }
      // 全選択・選択解除
      for (var i=0,l=items.length;i<l;i++) {
        if (items[i].classList.contains('is-disabled')) {

        } else {
          items[i].classList.toggle('is-selected', selectAll);
        }
      }      
    }
  }, false);
};

/**
 * ストアに選択中アイテムをセットする
 */
p.applySelect = function () {
  store.setMemberItems(this.memberIndex, this.getSelectedItems());
};

/**
 * 選択中のアイテムを取得する
 */
p.getSelectedItems = function () {
  var selected = [];
  var selectedElements = this.itemsContainer.querySelectorAll('.is-selected');
  for (var i=0,l=selectedElements.length;i<l;i++) {
    selected.push(parseInt(selectedElements[i].dataset.itemId));
  }
  return selected;
};

/**
 * storeの状態を描画する
 */
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

/**
 * カテゴリなしアイテムテーブルを描画
 */
p._renderBasicTable = function (instance) {
  var html = '<tr><td>';
  instance.items.forEach(function (item, i) {
    html += (this._renderItem(item, i));
  }, this);
  return html+'</td></tr>';
};

/**
 * カテゴリありアイテムテーブルを描画
 */
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

/**
 * アイテムを描画
 */
p._renderItem = function (item, id, displayName) {
  return '<div class="select-item-modal__item" data-item-id="'+id+'">'+
          '<div class="select-item-modal__itemImg"><img src="'+item.icon+'"></div>'+
          '<span class="select-item-modal__itemName">'+(displayName || item.shortName)+'</span>'+
         '</div>';
};

/**
 * カテゴリボタンを描画
 */
p._renderCategoryButton = function (category) {
  if (category.name) {
    return '<button class="btn-text js-category-select">'+category.name+'</button>';
  } else {
    return '';
  }
};

p.show = function (memberIndex) {
  if (this.memberIndex !== memberIndex) {
    this.memberIndex = memberIndex;
    this.render();
  }
  document.body.classList.add('select-item-open');
  this.el.classList.add('is-active');
};

p.hide = function () {
  this.el.classList.remove('is-active');
  document.body.classList.remove('select-item-open');
  this.memberIndex = null;
};

module.exports = new SelectItemModal();
