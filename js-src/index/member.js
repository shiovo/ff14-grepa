function Member(el) {
  this.el = el;

  this.name = el.querySelector('.input-name');
  this.displayName = this.name.nextSiblings;

  this.item = el.querySelector('.select-item');
  this.displayItem = this.item.nextSiblings;
  this.displayItemImg = this.displayItem.querySelector('figure img');
  this.displayItemName = this.displayItem.querySelector('figcaption span');
  this.displayItemSName = this.displayItem.querySelector('figcaption small');

  this.button = el.querySelector('.btn-text');
}

var p = Member.prototype;

p.setData = function (data) {
  this.name.value = data.name || '';
  this.item.selectedIndex = data.item || 0;
};

p.setOptions = function (optionsStr) {
  this.item.innerHTML = optionsStr;
  this.item.selectedIndex = 0;
}

p.decision = function () {


  this.el.classList.add('is-selected');
  this.button.innerHTML = '変更';
};

p.edit = function () {
  this.el.classList.remove('is-selected');
  this.button.innerHTML = '決定';
};

module.exports = Member;