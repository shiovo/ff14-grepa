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
    html += ' ' + mount + (store.data.options.mount !== 8 ? store.data.options.mount: 'フリー');
  }
  html += '\n';

  // 全選択アイテム
  var names = [];
  idData.resolveItemName(store.getAllSelectedItems()).forEach(function (ret) {
    var name = ret.name;
    if (ret.count > 1) {
      name += ret.count;
    }
    names.push(name);
  });
  html += names.join(' ') + '\n';
  html += '\n';

  // 個人選択アイテム
  store.data.member.forEach(function (member) {
    var names = [];
    idData.resolveItemName(member.item).forEach(function (ret) {
      var name = ret.name;
      if (ret.count > 1) {
        name += ret.count;
      }
      names.push(name);
    });
    html += '/p ' + member.name + ' ';
    html += names.join(' ') + '\n';
  });

  this.macroText.innerHTML = html;
};

module.exports = Macro;

