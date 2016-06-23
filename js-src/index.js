// var data = require('./data');

// var selectCategory = document.getElementById('select-category');
// var selectId = document.getElementById('select-id');
// var members = document.querySelector('#members');
// var selectItems = document.querySelectorAll('#members select');
// var clearAllBtn = document.querySelector('.m-clear .btn-text');
// var macroText = document.querySelector('#macro-text');
// var showName = document.querySelector('#switch-name2');

// var memberSelectedItem = [];
// var selectedItems = {};

// // ダンジョン配列を取得
// function getIds(index) {
//   index = index || selectCategory.selectedIndex || 0;
//   return data[index].ids;
// }

// // ドロップアイテム配列を取得
// function getItems(categoryIndex, idIndex) {
//   idIndex = idIndex || selectId.selectedIndex || 0;
//   return getIds(categoryIndex)[idIndex].items;
// }

// function save() {
//   var memberdata = [];
//   var memberRows = members.querySelectorAll('tbody tr');
//   for(var i=0,l=memberRows.length;i<l;i++) {
//     memberdata.push({
//       name: memberRows.item(i).querySelector('.input-name').value || '',
//       item: memberRows.item(i).querySelector('.select-item').selectedIndex || 0,
//       selected: memberRows.item(i).classList.contains('is-selected')
//     });
//   }
//   localStorage.setItem('data', JSON.stringify({
//     category: selectCategory.selectedIndex,
//     id: selectId.selectedIndex,
//     member: memberdata
//   }));
// }

// /**
//  * メンバーがアイテムを選択できるか
//  */
// function canSelect(memberIndex, itemIndex) {
//   return !selectedItems[itemIndex] || memberSelectedItem[memberIndex] === itemIndex;
// }

// function clearSaveData() {
//   localStorage.removeItem('data');
// }

// /**
//  * ダンジョン選択肢更新
//  */
// function updateSelectIdOptions() {
//   var ids = getIds();
//   var html = '';

//   // ダンジョン選択肢を再設定
//   for (var i=0,l=ids.length;i<l;i++) {
//     html += '<option value="'+i+'">'+ids[i].name+'</option>';
//   }

//   selectId.innerHTML = html;
//   selectId.selectedIndex = 0;
// }

// /**
//  * アイテム選択肢更新
//  */
// function resetSelectItemOptions() {
//   var items = getItems();
//   var itemSelects = members.querySelectorAll('.select-item');
//   var optionHtml = '';
//   var i,l,item,select;
//   for (i=0,l=items.length;i<l;i++) {
//     item = items[i];
//     optionHtml += '<option value="'+i+'">'+item.shortName+'</option>';
//   }

//   for (i=0,l=itemSelects.length;i<l;i++) {
//     select = itemSelects[i];
//     select.innerHTML = optionHtml;
//     select.selectedIndex = 0;
//   }
// }

// /**
//  * データ復元
//  */
// function restore() {
//   var json = localStorage.getItem('data');
//   var obj;
//   if (json) {
//     obj = JSON.parse(json);
//   } else {
//     obj = {};
//   }

//   // カテゴリ選択復元
//   selectCategory.selectedIndex = obj.category || 0;
//   // ダンジョン選択肢更新
//   updateSelectIdOptions();
//   // ダンジョン選択復元
//   selectId.selectedIndex = obj.id || 0;
//   // アイテム選択肢を更新
//   resetSelectItemOptions();

//   if (obj.member) {
//     obj.member.forEach(function (member, i) {
//       // メンバーデータを復元
//       setMemberData(i, member.name, member.item);

//       // 決定済の場合
//       if (member.selected) {
//         decisionMemberItem(i);
//       } else {
//         editMemberItem(i);
//       }
//     });
//   } else {
//     for (var i=0;i<8;i++) {
//       editMemberItem(i)
//     }
//   }
// }

// /**
//  * メンバーデータセット
//  */
// function setMemberData(memberIndex, nameValue, itemIndex) {
//   var member = members.querySelectorAll('tbody tr')[memberIndex];
//   var name = member.querySelector('.input-name');
//   var item = member.querySelector('.select-item');

//   name.value = nameValue || '';
//   item.selectedIndex = itemIndex || 0;
// }

// /**
//  * アイテム決定
//  */
// function decisionMemberItem(memberIndex) {
//   var member = members.querySelectorAll('tbody tr')[memberIndex];
//   var name = member.querySelector('.input-name');
//   var item = member.querySelector('.select-item');
//   var btn  = member.querySelector('.js-decision');

//   member.classList.add('is-selected');

//   var nameDest = name.nextSibling;
//   nameDest.innerHTML = name.value || '';

//   var itemData = getItems()[item.selectedIndex || 0];
//   var itemDest = item.nextSibling;
//   itemDest.querySelector('figure img').src = itemData.icon;
//   itemDest.querySelector('figcaption span').innerHTML = itemData.shortName;
//   itemDest.querySelector('figcaption small').innerHTML = '<' + itemData.name + '>';

//   btn.classList.add('is-edit');
//   btn.innerHTML = '変更'
// }

// /**
//  * アイテム変更
//  */
// function editMemberItem(i) {
//   var member = members.querySelectorAll('tbody tr')[i];
//   var btn  = member.querySelector('.js-decision');

//   member.classList.remove('is-selected');

//   btn.classList.remove('is-edit');
//   btn.innerHTML = '決定';
// }

// /**
//  * 選択済みアイテム集計
//  */
// function updateSelectedItems() {
//   var memberTrs = members.querySelectorAll('tbody tr');
//   var memberTr;
//   memberSelectedItem = [];
//   selectedItems = {};
//   for (var i=0,l=memberTrs.length;i<l;i++) {
//     memberTr = memberTrs[i];
//     if (memberTr.classList.contains('is-selected')) {
//       memberSelectedItem.push(memberTr.querySelector('.select-item').selectedIndex);
//     } else {
//       memberSelectedItem.push(false);
//     }
//   }

//   memberSelectedItem.forEach(function (itemIndex, i) {
//     if (itemIndex !== false) {
//       selectedItems[itemIndex] = (selectedItems[itemIndex] || 0) + 1;
//     }
//   });

//   updateMemberSelectItemDisabled();
// }

// /**
//  * アイテム選択肢の選択可・不可を設定する
//  */
// function updateMemberSelectItemDisabled() {
//   var itemSelects = members.querySelectorAll('.select-item');
//   var i,il, j,jl;
//   var options;
//   var selectedIndex;
//   for (i=0,il=itemSelects.length;i<il;i++) {
//     options = itemSelects[i].querySelectorAll('option');
//     selectedIndex = itemSelects[i].selectedIndex || 0;
//     for (j=0,jl=options.length;j<jl;j++) {
//       options[j].disabled = !canSelect(i, j);
//     }

//     // 選択中がdisabledの場合は選択可能な最初のアイテムを選択する
//     if (options[selectedIndex].disabled) {
//       for (j=0,jl=options.length;j<jl;j++) {
//         if (!options[j].disabled) {
//           itemSelects[i].selectedIndex = j;
//           break;
//         }
//       }
//     }
//   }
// }

// /**
//  * マクロ設定
//  */
// function renderMacroText() {
//   var text = '';
//   var isShowName = showName.checked === true;
//   var selected = document.querySelectorAll('.is-selected');
//   if (isShowName) {
//     var names = [];
//     var items = [];
//     var name;
//     var namesMaxLength = 0;
//     var lines = [];
//     for (var i=0,l=selected.length;i<l;i++) {
//       name = selected.item(i).querySelector('.td-name input').value || '';
//       namesMaxLength = Math.max(namesMaxLength, name.length);
//       names.push(name);

//       var item = selected.item(i).querySelector('.select-item')
//       items.push(item.options[item.selectedIndex].text);
//     }

//     for (i=0,l=names.length;i<l;i++) {
//       name = names[i] + Array(namesMaxLength - names[i].length + 1).join(' ');
//       lines.push('/p ' + name + ' ' + items[i]);
//     }

//     text = lines.join('\n');
//   }
//   else {
//     var items = [];
//     for (var i=0,l=selected.length;i<l;i++) {
//       var item = selected.item(i).querySelector('.select-item')
//       items.push(item.options[item.selectedIndex].text);
//     }

//     text = items.length ? '/p 〆:' + items.join(' ') : '';
//   }

//   macroText.value = text;
// }

// // カテゴリ変更
// selectCategory.addEventListener('change', function (e) {
//   // ダンジョン選択肢を更新
//   updateSelectIdOptions();

//   // 最初のダンジョンを選択
//   selectId.selectedIndex = 0;
//   selectId.dispatchEvent(new Event('change'));
// }, false);

// // ダンジョン変更
// selectId.addEventListener('change', function(e) {
//   // アイテム選択肢を更新
//   resetSelectItemOptions();
//   // 前メンバー編集
//   for (var i=0;i<8;i++) {
//     editMemberItem(i);
//   }
// }, false);

// // 決定・変更ボタン
// members.addEventListener('click', function(e){
//   if(!e.target.classList.contains('js-decision')){
//     return;
//   }

//   var memberIdx = parseInt(e.target.parentNode.parentNode.querySelector('th').innerHTML) - 1;
//   if (e.target.classList.contains('is-edit')){
//     // 変更
//     editMemberItem(memberIdx);
//   } else {
//     // 決定
//     decisionMemberItem(memberIdx);
//     save();
//   }

//   // 選択済みアイテムを更新
//   updateSelectedItems();

//   // マクロ更新
//   renderMacroText();

// }, false);

// function clearAll(shouldClearSaveData) {
//   var names = document.querySelectorAll('.input-name');
//   for (var i=0,l=names.length;i<l;i++) {
//     names.item(i).value = '';
//   }

//   selectCategory.selectedIndex = 0;
//   selectCategory.dispatchEvent(new Event('change'));

//   if (shouldClearSaveData) {
//     clearSaveData();
//   }
// }
// clearAllBtn.addEventListener('click', clearAll, false);

// document.querySelector('.l-macro .m-switch').addEventListener('change', renderMacroText, false);

// // カテゴリセレクトボックス初期化
// (function () {
//   var html = '';
//   for (var i=0,l=data.length;i<l;i++) {
//     html += '<option value="'+i+'">'+data[i].name+'</option>';
//   }
//   selectCategory.innerHTML = html;
//   selectCategory.selectedIndex = 0;
// })();

// clearAll();
// restore();


var store = require('./index/store');
var Config = require('./index/config');
var Member = require('./index/member');

var config = new Config();

var members = [];
var member;
for (var i=0;i<8;i++) {
  member = new Member(i);
  document.querySelector('#members tbody').appendChild(member.el);
  members.push(member);
}
store.restore();
console.log(store);
