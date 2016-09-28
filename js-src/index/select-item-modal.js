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

  function getParentElement(classSelector, element) {
    var current = element;
    while (current.parentElement) {
      current = current.parentElement;
      if (current.classList.contains(classSelector)) {
        return current;
      }
    }
    return null;
  }

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
    else if (getParentElement('select-item-modal__itemImg', e.target)) {
      var item = getParentElement('select-item-modal__item', e.target);
      if (item.classList.contains('is-disabled')) {
        item.classList.remove('is-selected');
      } else {
        item.classList.toggle('is-selected');
      }
      self._updateSelectedCount(item);
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
        self._updateSelectedCount(items[i]);
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
  var id;
  for (var i=0,l=selectedElements.length;i<l;i++) {
    id = selectedElements[i].dataset.itemId;
    if (!isNaN(id)) {
      id = parseInt(id);
    }
    selected.push(id);
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
  html = this._renderTable(instance);
  this.itemsContainer.innerHTML = html;

  // 選択中
  store.getSelectedItems(this.memberIndex).forEach(function (id) {
    var itemImg = this.itemsContainer.querySelector('[data-item-id="'+id+'"]');
    itemImg.classList.add('is-selected');
  }, this);

  this._updateSelectedCountAll();
};

/**
 * カテゴリありアイテムテーブルを描画
 */
p._renderTable = function (instance) {
  var html = '';
  instance.categories.forEach(function (category) {
    html += '<tr><th>'+category.name+'</th><td>';
    category.items.forEach(function (item) {
      html += this._renderItem(item);
    }, this);
    html += '</td></tr>';
  }, this);
  return html;
};

/**
 * アイテムを描画
 */
p._renderItem = function (item) {
  var itemSelectedCount = store.getItemSelectedCount(item.id, this.memberIndex);
  var itemLimit = store.getItemLimit(item.id);
  return '<div class="select-item-modal__item" data-item-id="'+item.id+'">'+
          '<div class="select-item-modal__itemImg">'+
            '<div class="select-item-modal__limit">'+
              '<span data-count="'+itemSelectedCount+'">'+itemSelectedCount+'</span>'+
              (
                itemLimit === 8 ? '' :
                '/'+
                '<span>'+itemLimit+'</span>'
              )+
            '</div>'+
            '<img src="'+item.icon+'"></div>'+
          '<span class="select-item-modal__itemName">'+item.shortName+'</span>'+
         '</div>';
};

p._updateSelectedCountAll = function() {
  var items = this.el.querySelectorAll('.select-item-modal__item');
  for (var i=0,l=items.length;i<l;i++) {
    this._updateSelectedCount(items[i]);
  }
};

p._updateSelectedCount = function(itemEle) {
  var id = itemEle.dataset.itemId;
  if (!isNaN(id)) {
    id = parseInt(id);
  }
  var itemLimit = store.getItemLimit(id);
  var countEle = itemEle.querySelector('.select-item-modal__limit span:first-child');
  var count = parseInt(countEle.dataset.count);
  count += ~~itemEle.classList.contains('is-selected');
  countEle.innerHTML = count;
  itemEle.classList.toggle('is-selected-just', count === itemLimit);
  itemEle.classList.toggle('is-selected-over', count > itemLimit);
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
