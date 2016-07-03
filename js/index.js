/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** multi index ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! D:\workspace\ff14-grepa\ff14-grepa\js-src\index.js */1);


/***/ },
/* 1 */
/*!*************************!*\
  !*** ./js-src/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

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


	var store  = __webpack_require__(/*! ./index/store */ 2);
	var Config = __webpack_require__(/*! ./index/config */ 20);
	var Macro  = __webpack_require__(/*! ./index/macro */ 21);
	var Member = __webpack_require__(/*! ./index/member */ 22);

	var config = new Config();
	var macro  = new Macro();

	var members = [];
	var member;
	for (var i=0;i<8;i++) {
	  member = new Member(i);
	  document.querySelector('#members tbody').appendChild(member.el);
	  members.push(member);
	}
	store.restore();
	console.log(store);


/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./js-src/index/store.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var idData = __webpack_require__(/*! ../data */ 3);

	function Store() {
	  this.data = {
	    category: 0,
	    id: 0,
	    options: {
	      limit: 1,
	      mount: 3
	    },
	    member: []
	  };
	  for (var i=0;i<8;i++) {
	    this.data.member.push({
	      name: '',
	      item: []
	    });
	  }

	  this.listeners = {};
	}

	Store.Events = {
	  RESTORE: 'restore',
	  CATEGORY_CHANGED: 'category_changed',
	  INSTANCE_CHANGED: 'instance_changed',
	  MEMBER_CHANGED: 'member_changed',
	  OPTION_CHANGED: 'option_changed',
	  REQUEST_MACRO_UPDATE: 'request_macro_update'
	};

	var p = Store.prototype;

	p.on = function (name, fn) {
	  var listeners = this.listeners[name] || (this.listeners[name] = []);
	  listeners.push(fn);
	};

	p.emit = function (name) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  var listeners = this.listeners[name];
	  if (listeners) {
	    listeners.forEach(function (fn) {
	      fn.apply(null, args);
	    });
	  }
	};

	p.restore = function () {
	  var json = localStorage.getItem('data');
	  if (json) {
	    var data = JSON.parse(json);
	    this._restoreData(data);
	  }
	  this.emit(Store.Events.RESTORE);
	};

	p.getOption = function (name) {
	  return this.data.options[name] !== undefined ?
	              this.data.options[name]:
	              defaultOptions[name];
	};

	/**
	 * 設定を保存する
	 */
	p.save = function () {

	};

	p._restoreData = function (data) {
	  this.data.category = data.category;
	  this.data.id = data.id;

	  // 旧バージョンはoptionsがないのでチェック
	  if (data.options) {
	    for (var i in data.options) {
	      this.data.options[i] = data.options[i];
	    }
	  }

	  data.member.forEach(function (member, i) {
	    if (Array.isArray(member.item)) {
	      // 現バージョンデータはそのまま設定
	      this.data.member[i].item = member.item;
	    } else if (member.selected) {
	      // 旧バージョンは数値型なので選択済みフラグの場合のみ設定
	      this.data.member[i].item.push(member.item);
	    }
	  }, this);
	};

	/**
	 * 行き先カテゴリを取得する
	 */
	p.getInstanceCategories = function () {
	  return idData;
	};

	/**
	 * 行き先カテゴリのダンジョンリストを取得する
	 */
	p.getInstances = function () {
	  return idData[this.data.category].ids;
	};

	/**
	 * 行き先ダンジョンを取得する
	 */
	p.getInstance = function () {
	  return this.getInstances()[this.data.id];
	};

	/**
	 * アイテムを取得する
	 */
	p.getItem = function(itemId) {
	  return this.getInstance().items[itemId];
	};

	/**
	 * メンバーの選択中アイテムを取得する
	 */
	p.getSelectedItems = function (memberIndex) {
	  return this.data.member[memberIndex].item;
	};

	/**
	 * メンバーの選択できないアイテムを取得する
	 */
	p.getUnSelectableItems = function (memberIndex) {
	  var idData = this.getInstance();
	  var selected = this.getSelectedItems(memberIndex);
	  var allSelected = this.getAllSelectedItems();
	  // 選択済のマウントの数を計算
	  var mountCount = 0;
	  if (idData.hasMount()) {
	    allSelected.forEach(function (itemId) {
	      var item = idData.items[itemId];
	      if (item.shortName.match(/(馬|鳥)/)) {
	        mountCount++;
	      }
	    });

	  }
	  var ret = [];
	  allSelected.forEach(function (itemId) {
	    // 自分の選択アイテムでなければ選択不可
	    if (selected.indexOf(itemId) < 0) {
	      ret.push(itemId);
	    }
	  });
	  return ret;
	};

	/**
	 * すべてのメンバーの選択中アイテムを取得する
	 */
	p.getAllSelectedItems = function (ignoreMemberId) {
	  var member;
	  var ret = [];
	  for (var i=0,l=this.data.member.length;i<l;i++) {
	    if (i === ignoreMemberId) {
	      continue;
	    }
	    member = this.data.member[i];
	    ret = ret.concat(member.item);
	  }
	  return ret;
	};

	p.getItemSelectedCount = function (itemId, ignoreMemberId) {
	  return this.getAllSelectedItems(ignoreMemberId).filter(function (id) {
	    return itemId === id;
	  }).length;
	};

	p.getItemLimit = function (itemId) {
	  var item = this.getItem(itemId);
	  if (item.shortName.match(/^(鳥|馬)$/)) {
	    return this.data.options.mount;
	  } else {
	    return this.data.options.limit;
	  }
	};

	/**
	 * 行き先カテゴリを設定する
	 */
	p.setInstanceCategory = function (category) {
	  this.data.category = category;
	  // インスタンスダンジョンをリセット
	  this.data.id = 0;
	  // 選択中アイテムをリセット
	  this.data.member.forEach(function (member) {
	    member.item = [];
	  });
	  this.save();
	  this.emit(Store.Events.CATEGORY_CHANGED);
	  this.emit(Store.Events.MEMBER_CHANGED);
	};

	/**
	 * 行き先インスタンスダンジョンを設定する
	 */
	p.setInstance = function (instance) {
	  this.data.id = instance;
	  // 選択中アイテムをリセット
	  this.data.member.forEach(function (member) {
	    member.item = [];
	  });
	  this.save();
	  this.emit(Store.Events.INSTANCE_CHANGED);
	  this.emit(Store.Events.MEMBER_CHANGED);
	};

	/**
	 * マウントオプション設定
	 */
	p.setMountOption = function (value) {
	  this.data.options.mount = value;
	  this.save();
	  this.emit(Store.Events.OPTION_CHANGED);
	};

	/**
	 * 制限オプション設定
	 */
	p.setLimitOption = function (value) {
	  this.data.options.limit = value;
	  this.save();
	  this.emit(Store.Events.OPTION_CHANGED);
	};

	/**
	 * メンバーの選択中アイテムを設定する
	 */
	p.setMemberItems = function (memberIndex, items) {
	  this.data.member[memberIndex].item = items;
	  this.save();
	  this.emit('member_'+memberIndex+'_changed');
	  this.emit(Store.Events.REQUEST_MACRO_UPDATE);
	};

	/**
	 * メンバーの選択中アイテムを選択解除する
	 */
	p.removeMemberItem = function (memberIndex, itemId) {
	  this.setMemberItems(memberIndex, 
	    this.data.member[memberIndex].item.filter(function (id) {
	      return id !== itemId;
	    })
	  );
	};

	p.setMemberName = function (memberIndex, name) {
	  this.data.member[memberIndex].name = name;
	  this.save();
	  // memberからの更新なのでメンバーイベント送らない
	  // this.emit('member_'+memberIndex+'_changed');
	  this.emit(Store.Events.REQUEST_MACRO_UPDATE);
	}

	module.exports = new Store();


/***/ },
/* 3 */
/*!******************************!*\
  !*** ./js-src/data/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var raids = __webpack_require__(/*! ./raids */ 4);
	var extremes = __webpack_require__(/*! ./extremes */ 14);

	var data = [
	  {
	    name: 'レイド',
	    ids: raids
	  },
	  {
	    name: '討伐・討滅戦',
	    ids: extremes
	  }
	];

	module.exports = data;

/***/ },
/* 4 */
/*!************************************!*\
  !*** ./js-src/data/raids/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var IdData = __webpack_require__(/*! ../id-data */ 5);

	module.exports = [
	  // require('alexander_ritudou_zero_01'),
	  // require('alexander_ritudou_zero_02'),
	  // require('alexander_ritudou_zero_03'),
	  // require('alexander_ritudou_zero_04'),

	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_01 */ 6)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_02 */ 7)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_03 */ 8)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_04 */ 9)),

	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_01 */ 10)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_02 */ 11)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_03 */ 12)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_04 */ 13)),

	];


/***/ },
/* 5 */
/*!********************************!*\
  !*** ./js-src/data/id-data.js ***!
  \********************************/
/***/ function(module, exports) {

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

	  this.itemCategoryMap = {};
	  if (this.hasCategory) {
	    this.categories.forEach(function (category, i) {
	      category.items.forEach(function (item) {
	        this.itemCategoryMap[item.id] = i;
	      }, this);
	    }, this);
	  }
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

	p.hasMount = function () {
	  var match;
	  for (var i=0,l=this.items.length;i<l;i++) {
	    if (match = this.items[i].shortName.match(/(馬|鳥)/)) {
	      return match[0];
	    }
	  }
	  return false;
	}

	p.resolveItemName = function (itemIds) {
	  if (!itemIds.length) {
	    return [];
	  }

	  var result = [];
	  // カテゴリがある場合、カテゴリ内すべて選択されていれば、カテゴリ名でまとめる
	  if (this.hasCategory) {
	    // カテゴリごとにアイテムを分ける
	    var itemsByCategory = [];
	    var itemsByCategoryMap = {};
	    itemIds.forEach(function (itemId) {
	      var categoryId = this.itemCategoryMap[itemId];
	      var category = this.categories[categoryId];
	      var itemCategory = itemsByCategoryMap[category.category];
	      if (!itemCategory) {
	        itemCategory = itemsByCategoryMap[category.category] = {
	          category: category,
	          items: []
	        };
	        itemsByCategory.push(itemCategory);
	      }
	      itemCategory.items.push(itemId);
	    }, this);
	    // カテゴリ単位で処理
	    itemsByCategory.forEach(function (itemCategory) {
	      // カテゴリ内の選択アイテム数とカテゴリ内の全アイテム数が同じ場合=カテゴリ選択の場合
	      if (itemCategory.items.length === itemCategory.category.items.length) {
	        // カテゴリ名でまとめる
	        result.push(itemCategory.category.name);
	      } else {
	        // カテゴリ名＋表示名でまとめる
	        var dispNames = [];
	        console.log(itemCategory);
	        itemCategory.category.items.forEach(function (item) {
	          if (itemCategory.items.indexOf(item.id) >= 0) {
	            dispNames.push(item.name);
	          }
	        });
	        result.push(itemCategory.category.name + dispNames.join('/'));
	      }
	    }, this);
	  } else {
	    itemIds.forEach(function (itemId) {
	      result.push(this.getItem(itemId).shortName);
	    }, this);
	  }
	  return result;
	};

	module.exports = IdData;


/***/ },
/* 6 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_01.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ機動編零式1層',
	  items: [
	    {
	      name: 'ゴルディオン・ディフェンダーネックバンド',
	      shortName: 'VIT首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーイヤリング',
	      shortName: 'VIT耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーリストバンド',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーリング',
	      shortName: 'VIT指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: 'ゴルディオン・アタッカーネックバンド',
	      shortName: 'STR首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      name: 'ゴルディオン・アタッカーイヤリング',
	      shortName: 'STR耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      name: 'ゴルディオン・アタッカーリストバンド',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      name: 'ゴルディオン・アタッカーリング',
	      shortName: 'STR指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーネックバンド',
	      shortName: 'DEX首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーイヤリング',
	      shortName: 'DEX耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーリストバンド',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーリング',
	      shortName: 'DEX指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターネックバンド',
	      shortName: 'INT首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターイヤリング',
	      shortName: 'INT耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターリストバンド',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターリング',
	      shortName: 'INT指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーネックバンド',
	      shortName: 'MND首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーイヤリング',
	      shortName: 'MND耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーリストバンド',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーリング',
	      shortName: 'MND指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 7 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_02.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ機動編零式2層',
	  items: [
	    {
	      name: 'ゴルディオン・ディフェンダーガントレット',
	      shortName: 'タンク手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b01_1.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーベルト',
	      shortName: 'タンク腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーソルレット',
	      shortName: 'タンク足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b01_3.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーガントレット',
	      shortName: '竜手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b02_1.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーベルト',
	      shortName: '竜腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーサバトン',
	      shortName: '竜足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b02_3.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーガントレット',
	      shortName: 'モンク手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b03_1.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーベルト',
	      shortName: 'モンク腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーサバトン',
	      shortName: 'モンク足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b03_3.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーアームガード',
	      shortName: 'レンジ手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b04_1.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーベルト',
	      shortName: 'レンジ腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーサバトン',
	      shortName: 'レンジ足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b04_3.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトアームガード',
	      shortName: '忍手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b05_1.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトベルト',
	      shortName: '忍腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトサバトン',
	      shortName: '忍足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b05_3.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターグローブ',
	      shortName: 'キャス手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b06_1.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターベルト',
	      shortName: 'キャス腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターガンビエラ',
	      shortName: 'キャス足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b06_3.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーグローブ',
	      shortName: 'ヒラ手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b07_1.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーベルト',
	      shortName: 'ヒラ腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーガンビエラ',
	      shortName: 'ヒラ足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b07_3.png'
	    },
	    {
	      name: '青の硬化薬',
	      shortName: '薬',
	      job: 0,
	      icon: 'images/item/areki_z/2/d01.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 8 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_03.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ機動編零式3層',
	  items: [
	    {
	      name: 'ゴルディオン・ディフェンダーアーメット',
	      shortName: 'タンク頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b01_1.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダーブリーチ',
	      shortName: 'タンク脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b01_2.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーサレット',
	      shortName: '竜頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b02_1.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーブリーチ',
	      shortName: '竜脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b02_2.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーサレット',
	      shortName: 'モンク頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b03_1.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーブリーチ',
	      shortName: 'モンク脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b03_2.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーフード',
	      shortName: 'レンジ頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b04_1.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーポレイン',
	      shortName: 'レンジ脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b04_2.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトフード',
	      shortName: '忍頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b05_1.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトポレイン',
	      shortName: '忍脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b05_2.png'
	    },
	    {
	      name: 'ゴルディオン・キャスタークラウン',
	      shortName: 'キャス頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b06_1.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターブレエット',
	      shortName: 'キャス脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b06_2.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラークラウン',
	      shortName: 'ヒラ頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b07_1.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーブレエット',
	      shortName: 'ヒラ脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b07_2.png'
	    },
	    {
	      name: '青の強化繊維',
	      shortName: '繊維',
	      job: 0,
	      icon: 'images/item/areki_z/3/d01.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 9 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_04.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ機動編零式4層',
	  items: [
	    {
	      name: 'ゴルディオンブレード',
	      shortName: '片手剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a01.png'
	    },
	    {
	      name: 'ゴルディオンシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/areki_z/4/c01.png'
	    },
	    {
	      name: 'ゴルディオンアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/areki_z/4/a02.png'
	    },
	    {
	      name: 'ゴルディオングレートソード',
	      shortName: '両手剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a03.png'
	    },
	    {
	      name: 'ゴルディオンセスタス',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/areki_z/4/a04.png'
	    },
	    {
	      name: 'ゴルディオントライデント',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/areki_z/4/a06.png'
	    },
	    {
	      name: 'ゴルディオンバゼラード',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a05.png'
	    },
	    {
	      name: 'ゴルディオンロングボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/areki_z/4/a07.png'
	    },
	    {
	      name: 'ゴルディオンマスケトン',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/areki_z/4/a08.png'
	    },
	    {
	      name: 'ゴルディオンスタッフ',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/areki_z/4/a09.png'
	    },

	    {
	      name: 'ゴルディオングリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/areki_z/4/a10.png'
	    },

	    {
	      name: 'ゴルディオンケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/areki_z/4/a11.png'
	    },
	    {
	      name: 'ゴルディオンコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/areki_z/4/a12.png'
	    },
	    {
	      name: 'ゴルディオンアストロメーター',
	      shortName: '天球儀',
	      job: 0,
	      icon: 'images/item/areki_z/4/a13.png'
	    },
	    {
	      name: 'ゴルディオン・ディフェンダープレートメイル',
	      shortName: 'タンク胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b01.png'
	    },
	    {
	      name: 'ゴルディオン・スレイヤーメイル',
	      shortName: '竜胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b02.png'
	    },
	    {
	      name: 'ゴルディオン・ストライカーメイル',
	      shortName: 'モンク胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b03.png'
	    },
	    {
	      name: 'ゴルディオン・レンジャーコースリット',
	      shortName: 'レンジ胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b04.png'
	    },
	    {
	      name: 'ゴルディオン・スカウトコースリット',
	      shortName: '忍胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b05.png'
	    },
	    {
	      name: 'ゴルディオン・キャスターガウン',
	      shortName: 'キャス胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b06.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーガウン',
	      shortName: 'ヒラ胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b07.png'
	    },
	    {
	      name: '青の強化薬',
	      shortName: '薬',
	      job: 0,
	      icon: 'images/item/areki_z/4/d02.png'
	    },
	    {
	      name: 'ゴブリウォーカーギア',
	      shortName: 'タチコマ',
	      job: 0,
	      icon: 'images/item/areki_z/4/d01.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 10 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_01.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '真成1層',
	  items: [
	    {
	      name: 'バハムート・ディフェンダーサバトン',
	      shortName: 'タンク足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b01.png'
	    },
	    {
	      name: 'バハムート・ストライカーサークレット',
	      shortName: 'モ頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b02.png'
	    },
	    {
	      name: 'バハムート・ストライカーサッシュ',
	      shortName: 'モ腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・スレイヤーヴァンブレイス',
	      shortName: '竜手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b03.png'
	    },
	    {
	      name: 'バハムート・スレイヤータセット',
	      shortName: '竜腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・スカウトブレーサー',
	      shortName: '忍手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b04.png'
	    },
	    {
	      name: 'バハムート・スカウトサッシュ',
	      shortName: '忍腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・スカウトブーツ',
	      shortName: '忍足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b05.png'
	    },
	    {
	      name: 'バハムート・レンジャーブレーサー',
	      shortName: '詩手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b06.png'
	    },
	    {
	      name: 'バハムート・レンジャーサッシュ',
	      shortName: '詩腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・キャスターペタソス',
	      shortName: 'キャス頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b07.png'
	    },
	    {
	      name: 'バハムート・ヒーラーフード',
	      shortName: 'ヒラ頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b08.png'
	    },
	    {
	      name: 'バハムート・ヒーラーシューズ',
	      shortName: 'ヒラ足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b09.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーブレスレット',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーリング',
	      shortName: 'VIT指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      name: 'バハムート・アタッカーチョーカー',
	      shortName: 'STR首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      name: 'バハムート・レンジャーイヤリング',
	      shortName: 'DEX耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      name: 'バハムート・キャスターチョーカー',
	      shortName: 'INT首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      name: 'バハムート・キャスターリング',
	      shortName: 'INT指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      name: 'バハムート・ヒーラーイヤリング',
	      shortName: 'MND耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 11 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_02.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '真成2層',
	  items: [
	    {
	      name: 'バハムート・ディフェンダーガントレット',
	      shortName: 'タンク手',
	      job: 0,
	      icon: 'images/item/sinsei/2/b01.png'
	    },
	    {
	      name: 'バハムート・ストライカーブレーサー',
	      shortName: 'モ手',
	      job: 0,
	      icon: 'images/item/sinsei/2/b02.png'
	    },
	    {
	      name: 'バハムート・ストライカーブーツ',
	      shortName: 'モ足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b03.png'
	    },
	    {
	      name: 'バハムート・スレイヤーバルビュート',
	      shortName: '竜頭',
	      job: 0,
	      icon: 'images/item/sinsei/2/b04.png'
	    },
	    {
	      name: 'バハムート・スレイヤーメイル',
	      shortName: '竜胴',
	      job: 0,
	      icon: 'images/item/sinsei/2/b05.png'
	    },
	    {
	      name: 'バハムート・スカウトサークレット',
	      shortName: '忍頭',
	      job: 0,
	      icon: 'images/item/sinsei/2/b06.png'
	    },
	    {
	      name: 'バハムート・レンジャーグリーヴ',
	      shortName: '詩足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b07.png'
	    },
	    {
	      name: 'バハムート・キャスターローブ',
	      shortName: 'キャス胴',
	      job: 0,
	      icon: 'images/item/sinsei/2/b08.png'
	    },
	    {
	      name: 'バハムート・キャスターベルト',
	      shortName: 'キャス腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・キャスターシューズ',
	      shortName: 'キャス足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b09.png'
	    },
	    {
	      name: 'バハムート・ヒーラーベルト',
	      shortName: 'ヒラ腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・ヒーラートンバン',
	      shortName: 'ヒラ脚',
	      job: 0,
	      icon: 'images/item/sinsei/2/b10.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーチョーカー',
	      shortName: 'VIT首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーイヤリング',
	      shortName: 'VIT耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      name: 'バハムート・アタッカーリング',
	      shortName: 'STR指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      name: 'バハムート・レンジャーチョーカー',
	      shortName: 'DEX首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      name: 'バハムート・レンジャーブレスレット',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      name: 'バハムート・ヒーラーブレスレット',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 12 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_03.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '真成3層',
	  items: [
	    {
	      name: 'バハムート・ディフェンダーコロネット',
	      shortName: 'タンク頭',
	      job: 0,
	      icon: 'images/item/sinsei/3/b01.png'
	    },
	    {
	      name: 'バハムート・ディフェンダータセット',
	      shortName: 'タンク腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーサルエル',
	      shortName: 'タンク脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b02.png'
	    },
	    {
	      name: 'バハムートシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/sinsei/3/c01.png'
	    },
	    {
	      name: 'バハムート・ストライカーシクラス',
	      shortName: 'モ胴',
	      job: 0,
	      icon: 'images/item/sinsei/3/b03.png'
	    },
	    {
	      name: 'バハムート・スレイヤーグリーヴ',
	      shortName: '竜足',
	      job: 0,
	      icon: 'images/item/sinsei/3/b04.png'
	    },
	    {
	      name: 'バハムート・スカウトスロップ',
	      shortName: '忍脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b05.png'
	    },
	    {
	      name: 'バハムート・レンジャーシャポー',
	      shortName: '詩頭',
	      job: 0,
	      icon: 'images/item/sinsei/3/b06.png'
	    },
	    {
	      name: 'バハムート・レンジャーブリーチ',
	      shortName: '詩脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b07.png'
	    },
	    {
	      name: 'バハムート・キャスターグローブ',
	      shortName: 'キャス手',
	      job: 0,
	      icon: 'images/item/sinsei/3/b08.png'
	    },
	    {
	      name: 'バハムート・ヒーラーグローブ',
	      shortName: 'ヒラ手',
	      job: 0,
	      icon: 'images/item/sinsei/3/b09.png'
	    },
	    {
	      name: 'バハムート・アタッカーイヤリング',
	      shortName: 'STR耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      name: 'バハムート・アタッカーブレスレット',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      name: 'バハムート・レンジャーリング',
	      shortName: 'DEX指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      name: 'バハムート・キャスターイヤリング',
	      shortName: 'INT耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      name: 'バハムート・キャスターブレスレット',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      name: 'バハムート・ヒーラーチョーカー',
	      shortName: 'MND首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      name: 'バハムート・ヒーラーリング',
	      shortName: 'MND指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 13 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_04.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '真成4層',
	  items: [
	    {
	      name: 'バハムートブレード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/sinsei/4/a01.png'
	    },
	    {
	      name: 'バハムートバルディッシュ',
	      shortName: '斧',
	      job: 1,
	      icon: 'images/item/sinsei/4/a02.png'
	    },
	    {
	      name: 'バハムートクロー',
	      shortName: '爪',
	      job: 6,
	      icon: 'images/item/sinsei/4/a03.png'
	    },
	    {
	      name: 'バハムートスピア',
	      shortName: '槍',
	      job: 6,
	      icon: 'images/item/sinsei/4/a04.png'
	    },
	    {
	      name: 'バハムートダガー',
	      shortName: '双剣',
	      job: 6,
	      icon: 'images/item/sinsei/4/a06.png'
	    },

	    {
	      name: 'バハムートロングボウ',
	      shortName: '弓',
	      job: 6,
	      icon: 'images/item/sinsei/4/a05.png'
	    },
	    {
	      name: 'バハムートスタッフ',
	      shortName: '黒杖',
	      job: 6,
	      icon: 'images/item/sinsei/4/a08.png'
	    },
	    {
	      name: 'バハムートグリモア',
	      shortName: '召本',
	      job: 6,
	      icon: 'images/item/sinsei/4/a09.png'
	    },
	    {
	      name: 'バハムートケーン',
	      shortName: '白杖',
	      job: 6,
	      icon: 'images/item/sinsei/4/a07.png'
	    },
	    {
	      name: 'バハムートコーデックス',
	      shortName: '学本',
	      job: 6,
	      icon: 'images/item/sinsei/4/a10.png'
	    },
	    {
	      name: 'バハムート・ディフェンダーアーマー',
	      shortName: 'タンク胴',
	      job: 0,
	      icon: 'images/item/sinsei/4/b01.png'
	    },

	    {
	      name: 'バハムート・ストライカースロップ',
	      shortName: 'モ脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b02.png'
	    },

	    {
	      name: 'バハムート・スレイヤーブリーチ',
	      shortName: '竜脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b03.png'
	    },

	    {
	      name: 'バハムート・スカウトシクラス',
	      shortName: '忍胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b04.png'
	    },

	    {
	      name: 'バハムート・レンジャータバード',
	      shortName: '詩人胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b05.png'
	    },

	    {
	      name: 'バハムート・キャスタートンバン',
	      shortName: 'キャス脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b06.png'
	    },

	    {
	      name: 'バハムート・ヒーラーローブ',
	      shortName: 'ヒラ胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b07.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 14 */
/*!***************************************!*\
  !*** ./js-src/data/extremes/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var IdData = __webpack_require__(/*! ../id-data */ 5);

	module.exports = [
	  new IdData(__webpack_require__(/*! ./nidhogg */ 15)),
	  new IdData(__webpack_require__(/*! ./sephiroth */ 16)),
	  new IdData(__webpack_require__(/*! ./nights_of_round */ 17)),
	  new IdData(__webpack_require__(/*! ./ravana */ 18)),
	  new IdData(__webpack_require__(/*! ./shiva */ 19)),
	];



/***/ },
/* 15 */
/*!*****************************************!*\
  !*** ./js-src/data/extremes/nidhogg.js ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ニーズヘッグ',
	  items: [
	    {
	      name: 'ダークラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      name: 'ニーズヘッグブレード',
	      shortName: '片手剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a01.png'
	    },
	    {
	      name: 'ニーズヘッグシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_nees/b01.png'
	    },
	    {
	      name: 'ニーズヘッグアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_nees/a02.png'
	    },
	    {
	      name: 'ニーズヘッグディバイダー',
	      shortName: '両手剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a03.png'
	    },
	    {
	      name: 'ニーズヘッグナックル',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_nees/a04.png'
	    },
	    {
	      name: 'ニーズヘッグスピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_nees/a06.png'
	    },
	    {
	      name: 'ニーズヘッグダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a05.png'
	    },
	    {
	      name: 'ニーズヘッグボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_nees/a07.png'
	    },
	    {
	      name: 'ニーズヘッグハンドゴンネ',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_nees/a08.png'
	    },
	    {
	      name: 'ニーズヘッグロッド',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_nees/a09.png'
	    },

	    {
	      name: 'ニーズヘッググリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_nees/a10.png'
	    },

	    {
	      name: 'ニーズヘッグケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_nees/a11.png'
	    },
	    {
	      name: 'ニーズヘッグコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_nees/a12.png'
	    },
	    {
	      name: 'ニーズヘッグスターグローブ',
	      shortName: '天球儀',
	      job: 0,
	      icon: 'images/item/goku_nees/a13.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 16 */
/*!*******************************************!*\
  !*** ./js-src/data/extremes/sephiroth.js ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極セフィロト',
	  items: [
	    {
	      name: 'ウォーリングラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      name: 'ブレード・オブ・セフィロト',
	      shortName: '片手剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a01.png'
	    },
	    {
	      name: 'シールド・オブ・セフィロト',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_sefi/b01.png'
	    },
	    {
	      name: 'アクス・オブ・セフィロト',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_sefi/a02.png'
	    },
	    {
	      name: 'エッジ・オブ・セフィロト',
	      shortName: '両手剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a03.png'
	    },
	    {
	      name: 'フィスト・オブ・セフィロト',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_sefi/a04.png'
	    },
	    {
	      name: 'パイク・オブ・セフィロト',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_sefi/a06.png'
	    },
	    {
	      name: 'ポインツ・オブ・セフィロト',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a05.png'
	    },
	    {
	      name: 'ボウ・オブ・セフィロト',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_sefi/a07.png'
	    },
	    {
	      name: 'ファイア・オブ・セフィロト',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_sefi/a08.png'
	    },
	    {
	      name: 'スタッフ・オブ・セフィロト',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_sefi/a09.png'
	    },

	    {
	      name: 'ワード・オブ・セフィロト',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_sefi/a10.png'
	    },

	    {
	      name: 'ケーン・オブ・セフィロト',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_sefi/a11.png'
	    },
	    {
	      name: 'ソング・オブ・セフィロト',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_sefi/a12.png'
	    },
	    {
	      name: 'スター・オブ・セフィロト',
	      shortName: '天球儀',
	      job: 0,
	      icon: 'images/item/goku_sefi/a13.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 17 */
/*!*************************************************!*\
  !*** ./js-src/data/extremes/nights_of_round.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ナイツ・オブ・ラウンド',
	  items: [
	    {
	      name: 'ラナー・オブ・ラウンドホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      name: 'ヘヴンスソード',
	      shortName: '片手剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a01.png'
	    },
	    {
	      name: 'ヘヴンスシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_kor/b01.png'
	    },
	    {
	      name: 'ヘヴンスアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_kor/a02.png'
	    },
	    {
	      name: 'ヘヴンスクレイモア',
	      shortName: '両手剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a03.png'
	    },
	    {
	      name: 'ヘヴンスナックル',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_kor/a04.png'
	    },
	    {
	      name: 'ヘヴンスハルバード',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_kor/a06.png'
	    },
	    {
	      name: 'ヘヴンスダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a05.png'
	    },
	    {
	      name: 'ヘヴンスボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_kor/a07.png'
	    },
	    {
	      name: 'ヘヴンスファイア',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_kor/a08.png'
	    },
	    {
	      name: 'ヘヴンススタッフ',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_kor/a09.png'
	    },

	    {
	      name: 'ヘヴンスグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_kor/a10.png'
	    },

	    {
	      name: 'ヘヴンスケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_kor/a11.png'
	    },
	    {
	      name: 'ヘヴンスコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_kor/a12.png'
	    },
	    {
	      name: 'ヘヴンスメーター',
	      shortName: '天球儀',
	      job: 0,
	      icon: 'images/item/goku_kor/a13.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 18 */
/*!****************************************!*\
  !*** ./js-src/data/extremes/ravana.js ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ラーヴァナ',
	  items: [
	    {
	      name: 'ラースラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      name: 'ラーヴァナシャムシール',
	      shortName: '片手剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a01.png'
	    },
	    {
	      name: 'ラーヴァナスクトゥム',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_ravana/b01.png'
	    },
	    {
	      name: 'ラーヴァナバトルアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_ravana/a02.png'
	    },
	    {
	      name: 'ラーヴァナクレイモア',
	      shortName: '両手剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a03.png'
	    },
	    {
	      name: 'ラーヴァナクロー',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_ravana/a04.png'
	    },
	    {
	      name: 'ラーヴァナスピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_ravana/a06.png'
	    },
	    {
	      name: 'ラーヴァナクリス',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a05.png'
	    },
	    {
	      name: 'ラーヴァナボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_ravana/a07.png'
	    },
	    {
	      name: 'ラーヴァナマスケトン',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_ravana/a08.png'
	    },
	    {
	      name: 'ラーヴァナロングポール',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_ravana/a09.png'
	    },

	    {
	      name: 'ラーヴァナグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_ravana/a10.png'
	    },

	    {
	      name: 'ラーヴァナケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_ravana/a11.png'
	    },
	    {
	      name: 'ラーヴァナコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_ravana/a12.png'
	    },
	    {
	      name: 'ラーヴァナプラニスフィア',
	      shortName: '天球儀',
	      job: 0,
	      icon: 'images/item/goku_ravana/a13.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};



/***/ },
/* 19 */
/*!***************************************!*\
  !*** ./js-src/data/extremes/shiva.js ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極シヴァ',
	  items: [
	    {
	      name: 'ボレアスホイッスル',
	      shortName: '馬',
	      job: 0,
	      icon: 'images/item/goku_siva/e01.png'
	    },
	    {
	      name: 'シヴァ・アイスブランド',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_siva/a01.png'
	    },
	    {
	      name: 'シヴァ・アイスアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_siva/a02.png'
	    },
	    {
	      name: 'シヴァ・アイスシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_siva/d01.png'
	    },
	    {
	      name: 'シヴァ・アイスクロー',
	      shortName: '爪',
	      job: 0,
	      icon: 'images/item/goku_siva/a03.png'
	    },
	    {
	      name: 'シヴァ・アイススピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_siva/a04.png'
	    },
	    {
	      name: 'シヴァ・アイスダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_siva/a06.png'
	    },
	    {
	      name: 'シヴァ・アイスボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_siva/a05.png'
	    },
	    {
	      name: 'シヴァ・アイスロッド',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_siva/a07.png'
	    },

	    {
	      name: 'シヴァ・アイスグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_siva/a09.png'
	    },

	    {
	      name: 'シヴァ・アイスケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_siva/a08.png'
	    },

	    {
	      name: 'シヴァ・アイスコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_siva/a10.png'
	    },

	    {
	      name: 'アイス・ディフェンダーブレスレット',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },

	    {
	      name: 'アイス・アタッカーブレスレット',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },

	    {
	      name: 'アイス・レンジャーブレスレット',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },
	    {
	      name: 'アイス・キャスターブレスレット',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },
	    {
	      name: 'アイス・ヒーラーブレスレット',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },
	    {
	      name: '希望品無し',
	      shortName: '無',
	      job: 0,
	      icon: 'images/item/common/none.png'
	    }
	  ]
	};


/***/ },
/* 20 */
/*!********************************!*\
  !*** ./js-src/index/config.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);

	function Config() {
	  this.categoryEl = document.querySelector('#select-category');
	  this.instanceEl = document.querySelector('#select-id');

	  // オプション
	  this.limitContainer = document.querySelector('#option-limit');
	  this.limit = this.limitContainer.querySelector('select');

	  this.mountContainer = document.querySelector('#option-mount');
	  this.mount = this.mountContainer.querySelector('select');

	  this.initBindings();
	}

	var p = Config.prototype;

	p.initBindings = function () {
	  var self = this;

	  this.categoryEl.addEventListener('change', function () {
	    store.setInstanceCategory(self.categoryEl.selectedIndex);
	  }, false);

	  this.instanceEl.addEventListener('change', function () {
	    store.setInstance(self.instanceEl.selectedIndex);
	  }, false);

	  this.mount.addEventListener('change', function () {
	    var value = parseInt(self.mount.value);
	    if (isNaN(value)) {
	      value = 1;
	    }
	    store.setMountOption(value);
	  }, false);

	  this.limit.addEventListener('change', function () {
	    var value = parseInt(self.limit.value);
	    if (isNaN(value)) {
	      value = 1;
	    }
	    store.setLimitOption(value);
	  }, false);

	  // storeイベント
	  store.on('restore', function () {
	    self.renderCategory();
	    self.renderId();
	    self.renderOptionLimit();
	  });
	  store.on('category_changed', function () {
	    self.renderId();
	    self.renderOptionLimit();
	  });
	  store.on('instance_changed', function () {
	    self.renderOptionLimit();
	  });
	};

	p.renderCategory = function () {
	  var html = '';
	  store.getInstanceCategories().forEach(function (category, i) {
	    html += '<option value="' + i + '">' + category.name + '</option>';
	  });
	  this.categoryEl.innerHTML = html;
	  this.categoryEl.selectedIndex = store.data.category;
	};

	p.renderId = function () {
	  var html = '';
	  store.getInstances().forEach(function (instance, i) {
	    html += '<option value="' + i + '">' + instance.name + '</option>';
	  });
	  this.instanceEl.innerHTML = html;
	  this.instanceEl.selectedIndex = store.data.id;
	};

	p.renderOptionLimit = function () {
	  var idData = store.getInstance();
	  var mount = idData.hasMount();
	  this.mount.value = store.data.options.mount;
	  this.mountContainer.classList.toggle('is-hide', !idData.hasMount());
	  this.mountContainer.querySelector('span').innerHTML = mount || '';
	};

	module.exports = Config;

/***/ },
/* 21 */
/*!*******************************!*\
  !*** ./js-src/index/macro.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);

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



/***/ },
/* 22 */
/*!********************************!*\
  !*** ./js-src/index/member.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);
	var modal = __webpack_require__(/*! ./select-item-modal */ 23);

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
	      store.removeMemberItem(self.id, parseInt(e.target.parentElement.parentElement.dataset.itemId));
	    }
	  }, false);

	  this.el.addEventListener('keydown', function (e) {
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

/***/ },
/* 23 */
/*!*******************************************!*\
  !*** ./js-src/index/select-item-modal.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);

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

	  this._updateSelectedCountAll();
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
	  var itemSelectedCount = store.getItemSelectedCount(id, this.memberIndex);
	  var itemLimit = store.getItemLimit(id);
	  return '<div class="select-item-modal__item" data-item-id="'+id+'">'+
	          '<div class="select-item-modal__itemImg">'+
	            '<div class="select-item-modal__limit">'+
	              '<span data-count="'+itemSelectedCount+'">'+itemSelectedCount+'</span>'+
	              '/'+
	              '<span>'+itemLimit+'</span>'+
	            '</div>'+
	            '<img src="'+item.icon+'"></div>'+
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

	p._updateSelectedCountAll = function() {
	  var items = this.el.querySelectorAll('.select-item-modal__item');
	  for (var i=0,l=items.length;i<l;i++) {
	    this._updateSelectedCount(items[i]);
	  }
	};

	p._updateSelectedCount = function(itemEle) {
	  var countEle = itemEle.querySelector('.select-item-modal__limit span:first-child');
	  var count = parseInt(countEle.dataset.count);
	  count += ~~itemEle.classList.contains('is-selected');
	  countEle.innerHTML = count;
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


/***/ }
/******/ ]);