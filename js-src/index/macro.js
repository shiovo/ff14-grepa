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
  // option
  // html += '装備' + this.limitText(store.data.options.limit);
  // if (idData.hasMount()) {
  //   html += ' ' + idData.getMount().shortName + this.limitText(store.data.options.mount);
  // }
  // html += '\n';

  // 全選択アイテム
  var names = [];
  idData.resolveItemName(store.getAllSelectedItems()).forEach(function (ret) {
    var name = ret.shortName;
    if (ret.count > 1) {
      name += ret.count;
    }
    names.push(name);
  });
  if (names.length) {
    html += '〆' + names.join(' ') + '\n';
  }
  html += '\n';

  // 個人選択アイテム
  store.data.member.forEach(function (member) {
    var names = [];
    idData.resolveItemName(member.item).forEach(function (ret) {
      var name = ret.shortName;
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

p.limitText = function (limit) {
  return limit === 8 ? 'フリー' : limit + '〆';
};

module.exports = Macro;

