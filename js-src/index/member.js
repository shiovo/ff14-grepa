var store = require('./store');
var modal = require('./select-item-modal');

function Member(id) {
  this.id = id;
  this.el = document.createElement('tr');
  this.el.classList.add('member');
  this.el.innerHTML = '<th>' + (id + 1) + '</th>'+
                      '<td class="td-name"><input type="text" class="input-name"></td>'+
                      '<td>'+
                        '<div class="member__selectedItems"></div>'+
                        '<button class="btn-text js-show-select-item-modal">アイテム選択</button>'+
                      '</td>';

  this.name = this.el.querySelector('.input-name');
  this.itemsContainer = this.el.querySelector('.member__selectedItems');

  this.initBindings();
}

var p = Member.prototype;

p.initBindings = function () {
  var self = this;

  this.el.addEventListener('click', function (e) {
    // モーダル表示
    if (e.target.classList.contains('js-show-select-item-modal')) {
      modal.show(self.id);
    }
    // アイテム選択解除
    else if (e.target.classList.contains('js-item-unselect')) {
      var itemId = e.target.parentElement.parentElement.dataset.itemId;
      if (!isNaN(itemId)) {
        itemId = parseInt(itemId);
      }
      store.removeMemberItem(self.id, itemId);
    }
  }, false);

  this.el.addEventListener('keyup', function (e) {
    // 名前設定
    if (e.target.classList.contains('input-name')) {
      store.setMemberName(self.id, (e.target.value || '').trim());
    }
  }, false);

  this.el.addEventListener('change', function (e) {
    // 名前設定
    if (e.target.classList.contains('input-name')) {
      store.setMemberName(self.id, (e.target.value || '').trim());
    }
  }, false);

  // storeイベント
  this.render = this.render.bind(this);
  store.on('restore', this.render);
  store.on('member_'+this.id+'_changed', this.render);
  store.on('member_changed', this.render);
};

/**
 * storeの状態を描画
 */
p.render = function() {
  var member = store.data.member[this.id];
  this.name.value = member.name || '';
  this.renderItems(member.item);
};

/**
 * 選択済みアイテムを描画
 */
p.renderItems = function(itemIds) {
  var idData = store.getInstance();

  var html = '';
  itemIds.forEach(function (itemId) {
    var item = idData.getItem(itemId);
    if (!item) {
      return;
    }
    html += '<div class="td-item" data-item-id="'+itemId+'">'+
              '<figure><img src="'+item.icon+'"></figure>'+
              '<figcaption>'+
                '<span>'+item.shortName+'</span>'+
                '<small><'+item.name+'></small>'+
              '</figcaption>'+
              '<div class="td-item-btn"><button class="btn-delete btn-text is-danger js-item-unselect">×</button></div>'+
            '</div>';
  }, this);
  this.itemsContainer.innerHTML = html;
};

module.exports = Member;