var store = require('./store');

function Macro() {
  this.el = document.querySelector('.l-macro');
  this.macroText = this.el.querySelector('#macro-text');

  this.initBinding();
}

var p = Macro.prototype;

/**
 * イベントハンドル
 */
p.initBinding = function () {
  var self = this;

  store.on('restore', function () {
    self.render();
  });
  store.on('option_changed', function () {
    self.render();
  });
  store.on('member_changed', function () {
    self.render();
  });
  store.on('request_macro_update', function () {
    self.render();
  });
};

p.render = function () {
  var html = '';

  var idData = store.getInstance();
  var mount = idData.hasMount();
  // option
  html += '〆:' + store.data.options.limit;
  if (mount) {
    html += ' ' + mount + (store.data.options.mount || 'フリー');
  }
  html += '\n';

  // 選択アイテム
  store.data.member.forEach(function (member) {
    html += member.name + ' ';
    html += idData.resolveItemName(member.item).join(' ') + '\n';
  });

  this.macroText.innerHTML = html;
};

module.exports = Macro;

