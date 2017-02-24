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

	module.exports = __webpack_require__(/*! /Users/shione/Desktop/work/ff14-grepa/js-src/index.js */1);


/***/ },
/* 1 */
/*!*************************!*\
  !*** ./js-src/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(/*! ./index/store */ 2);
	var Config = __webpack_require__(/*! ./index/config */ 26);
	var Macro  = __webpack_require__(/*! ./index/macro */ 27);
	var Member = __webpack_require__(/*! ./index/member */ 28);

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


/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./js-src/index/store.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var IdData = __webpack_require__(/*! ../data/id-data */ 3);
	var idData = __webpack_require__(/*! ../data */ 5);

	function Store() {
	  this.data = this.getDefaultData();
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

	p.getDefaultData = function () {
	  var data = {
	    category: 0,
	    id: 0,
	    options: {
	      limit: 1,
	      mount: 3
	    },
	    member: []
	  };
	  for (var i=0;i<8;i++) {
	    data.member.push({
	      name: '',
	      item: []
	    });
	  }
	  return data;
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
	  var json = JSON.stringify(this.data);
	  localStorage.setItem('data', json);
	};

	/**
	 * データをクリアする
	 */
	p.clear = function () {
	  this.data = this.getDefaultData();
	  this.save();
	  this.emit(Store.Events.RESTORE);
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
	    this.data.member[i].name = member.name;

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
	  var instances = this.getInstances();
	  for (var i=0,l=instances.length;i<l;i++) {
	    if (instances[i].id === this.data.id) {
	      return instances[i];
	    }
	  }
	  return null;
	};

	/**
	 * アイテムを取得する
	 */
	p.getItem = function(itemId) {
	  return this.getInstance().itemMap[itemId];
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
	  if (item.category === IdData.category.MOUNT) {
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
/*!********************************!*\
  !*** ./js-src/data/id-data.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var roles = __webpack_require__(/*! ./role */ 4);

	function IdData(data) {
	  this.id          = null;
	  this.name        = null;
	  this.items       = [];
	  this.itemMap     = {};
	  this.categories  = [];
	  this.categoryMap = {};

	  this.setData(data);
	}

	IdData.categoryMap = {
	  0: {
	    id: 0,
	    name: '武器'
	  },
	  1: {
	    id: 1,
	    name: '防具'
	  },
	  2: {
	    id: 2,
	    name: 'アクセサリー'
	  },
	  3: {
	    id: 3,
	    name: '強化素材'
	  },
	  4: {
	    id: 4,
	    name: 'マウント'
	  },
	  99: {
	    id: 99,
	    name: 'ジョブ・ロール'
	  }
	};

	IdData.category = {
	  MOUNT: 4
	};

	var p = IdData.prototype;

	p.setData = function (data) {
	  this.id    = data.id;
	  this.name  = data.name;

	  this.items = data.items;

	  this.items.forEach(function (item) {
	    // アイテムMAP
	    this.itemMap[item.id] = item;

	    // カテゴリ
	    var category = this.categoryMap[item.category];
	    if (!category) {
	      var categoryData = IdData.categoryMap[item.category];
	      category = this.categoryMap[item.category] = {
	        id: categoryData.id,
	        name: categoryData.name,
	        items: [],
	        itemIds: []
	      };
	      this.categoryMap[category.id] = category;
	      this.categories.push(category);
	    }

	    category.items.push(item);
	    category.itemIds.push(item.id);
	  }, this);

	  // 装備の出るダンジョンはロール追加
	  if (this.categoryMap[1] || this.categoryMap[2] || this.categoryMap[3]) {
	    var categoryId = 99;
	    var category = {
	      id: categoryId,
	      name: IdData.categoryMap[categoryId].name,
	      items: [],
	      itemIds: []
	    };
	    this.categories.push(category);
	    this.categoryMap[category.id] = category;
	    roles.forEach(function (role) {
	      var item = {};
	      for (var key in role) {
	        item[key] = role[key];
	      }
	      category.items.push(item);
	      category.itemIds.push(item.id);
	      this.items.push(item);
	      this.itemMap[item.id] = item;
	    }, this);
	  }
	};

	p.getItem = function (itemId) {
	  return this.itemMap[itemId];
	};

	p.hasMount = function () {
	  return !!this.categoryMap[4];
	};

	p.getMount = function () {
	  if (this.hasMount()) {
	    return this.categoryMap[4].items[0];
	  }
	  return null;
	};

	p.resolveItemName = function (itemIds) {
	  if (!itemIds.length) {
	    return [];
	  }
	  var ret = [];
	  var nameMap = {};
	  itemIds.forEach(function (id) {
	    var item = this.getItem(id);
	    var name = nameMap[item.id];
	    if (!name) {
	      name = nameMap[item.id] = {
	        name: item.name,
	        shortName: item.shortName,
	        count: 0
	      };
	      ret.push(name);
	    }
	    name.count++;
	  }, this)
	  return ret;
	};

	module.exports = IdData;


/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./js-src/data/role.js ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = [
	  {
	    id: 'tank',
	    category: 99,
	    name: 'タンク',
	    shortName: 'タンク',
	    icon: 'images/job/role_tank.png'
	  },
	  {
	    id: 'monk',
	    category: 99,
	    name: 'モンク',
	    shortName: 'モ',
	    icon: 'images/job/job_monk.png'
	  },
	  {
	    id: 'dragon',
	    category: 99,
	    name: '竜騎士',
	    shortName: '竜',
	    icon: 'images/job/job_dragon.png'
	  },
	  {
	    id: 'ninja',
	    category: 99,
	    name: '忍者',
	    shortName: '忍',
	    icon: 'images/job/job_ninjya.png'
	  },
	  {
	    id: 'ranger',
	    category: 99,
	    name: 'レンジ',
	    shortName: 'レンジ',
	    icon: 'images/job/job_bard.png'
	  },
	  {
	    id: 'caster',
	    category: 99,
	    name: 'キャスター',
	    shortName: 'キャス',
	    icon: 'images/job/job_black.png'
	  },
	  {
	    id: 'healer',
	    category: 99,
	    name: 'ヒーラー',
	    shortName: 'ヒラ',
	    icon: 'images/job/role_healer.png'
	  }
	];


/***/ },
/* 5 */
/*!******************************!*\
  !*** ./js-src/data/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var raids = __webpack_require__(/*! ./raids */ 6);
	var extremes = __webpack_require__(/*! ./extremes */ 19);

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
/* 6 */
/*!************************************!*\
  !*** ./js-src/data/raids/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var IdData = __webpack_require__(/*! ../id-data */ 3);

	module.exports = [
	  // require('alexander_ritudou_zero_01'),
	  // require('alexander_ritudou_zero_02'),
	  // require('alexander_ritudou_zero_03'),
	  // require('alexander_ritudou_zero_04'),

	  new IdData(__webpack_require__(/*! ./alexander_tendou_zero_01 */ 7)),
	  new IdData(__webpack_require__(/*! ./alexander_tendou_zero_02 */ 8)),
	  new IdData(__webpack_require__(/*! ./alexander_tendou_zero_03 */ 9)),
	  new IdData(__webpack_require__(/*! ./alexander_tendou_zero_04 */ 10)),

	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_01 */ 11)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_02 */ 12)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_03 */ 13)),
	  new IdData(__webpack_require__(/*! ./alexander_kidou_zero_04 */ 14)),

	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_01 */ 15)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_02 */ 16)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_03 */ 17)),
	  new IdData(__webpack_require__(/*! ./bahamut_sinsei_04 */ 18)),

	];


/***/ },
/* 7 */
/*!*******************************************************!*\
  !*** ./js-src/data/raids/alexander_tendou_zero_01.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ天動編零式1層',
	  id: 8,
	  items: [
	    {
	      id: 0,
	      category: 2,
	      name: 'アレキサンダー・ディフェンダーネックバンド',
	      shortName: 'VIT首',
	      job: 0,
	      icon: 'images/item/areki_3/1/c01.png'
	    },
	    {
	      id: 1,
	      category: 2,
	      name: 'アレキサンダー・ディフェンダーイヤリング',
	      shortName: 'VIT耳',
	      job: 0,
	      icon: 'images/item/areki_3/1/c02.png'
	    },
	    {
	      id: 2,
	      category: 2,
	      name: 'アレキサンダー・ディフェンダーリストバンド',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/areki_3/1/c03.png'
	    },
	    {
	      id: 3,
	      category: 2,
	      name: 'アレキサンダー・ディフェンダーリング',
	      shortName: 'VIT指',
	      job: 0,
	      icon: 'images/item/areki_3/1/c04.png'
	    },
	    {
	      id: 4,
	      category: 2,
	      name: 'アレキサンダー・アタッカーネックバンド',
	      shortName: 'STR首',
	      job: 0,
	      icon: 'images/item/areki_3/1/c01.png'
	    },
	    {
	      id: 5,
	      category: 2,
	      name: 'アレキサンダー・アタッカーイヤリング',
	      shortName: 'STR耳',
	      job: 0,
	      icon: 'images/item/areki_3/1/c02.png'
	    },
	    {
	      id: 6,
	      category: 2,
	      name: 'アレキサンダー・アタッカーリストバンド',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/areki_3/1/c03.png'
	    },
	    {
	      id: 7,
	      category: 2,
	      name: 'アレキサンダー・アタッカーリング',
	      shortName: 'STR指',
	      job: 0,
	      icon: 'images/item/areki_3/1/c04.png'
	    },
	    {
	      id: 8,
	      category: 2,
	      name: 'アレキサンダー・レンジャーネックバンド',
	      shortName: 'DEX首',
	      job: 0,
	      icon: 'images/item/areki_3/1/c01.png'
	    },
	    {
	      id: 9,
	      category: 2,
	      name: 'アレキサンダー・レンジャーイヤリング',
	      shortName: 'DEX耳',
	      job: 0,
	      icon: 'images/item/areki_3/1/c02.png'
	    },
	    {
	      id: 10,
	      category: 2,
	      name: 'アレキサンダー・レンジャーリストバンド',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/areki_3/1/c03.png'
	    },
	    {
	      id: 11,
	      category: 2,
	      name: 'アレキサンダー・レンジャーリング',
	      shortName: 'DEX指',
	      job: 0,
	      icon: 'images/item/areki_3/1/c04.png'
	    },
	    {
	      id: 12,
	      category: 2,
	      name: 'アレキサンダー・キャスターネックバンド',
	      shortName: 'INT首',
	      job: 0,
	      icon: 'images/item/areki_3/1/c01.png'
	    },
	    {
	      id: 13,
	      category: 2,
	      name: 'アレキサンダー・キャスターイヤリング',
	      shortName: 'INT耳',
	      job: 0,
	      icon: 'images/item/areki_3/1/c02.png'
	    },
	    {
	      id: 14,
	      category: 2,
	      name: 'アレキサンダー・キャスターリストバンド',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/areki_3/1/c03.png'
	    },
	    {
	      id: 15,
	      category: 2,
	      name: 'アレキサンダー・キャスターリング',
	      shortName: 'INT指',
	      job: 0,
	      icon: 'images/item/areki_3/1/c04.png'
	    },
	    {
	      name: 'アレキサンダー・ヒーラーネックバンド',
	      category: 2,
	      id: 16,
	      shortName: 'MND首',
	      job: 0,
	      icon: 'images/item/areki_3/1/c01.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'アレキサンダー・ヒーラーイヤリング',
	      shortName: 'MND耳',
	      job: 0,
	      icon: 'images/item/areki_3/1/c02.png'
	    },
	    {
	      id: 18,
	      category: 2,
	      name: 'アレキサンダー・ヒーラーリストバンド',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/areki_3/1/c03.png'
	    },
	    {
	      id: 19,
	      category: 2,
	      name: 'アレキサンダー・ヒーラーリング',
	      shortName: 'MND指',
	      job: 0,
	      icon: 'images/item/areki_3/1/c04.png'
	    },
	    {
	      id: 20,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーベルト',
	      shortName: 'タンク腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 22,
	      category: 1,
	      name: 'アレキサンダー・ストライカーベルト',
	      shortName: 'モ腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 21,
	      category: 1,
	      name: 'アレキサンダー・スレイヤーベルト',
	      shortName: '竜腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 24,
	      category: 1,
	      name: 'アレキサンダー・スカウトベルト',
	      shortName: '忍腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 23,
	      category: 1,
	      name: 'アレキサンダー・レンジャーベルト',
	      shortName: 'レンジ腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 25,
	      category: 1,
	      name: 'アレキサンダー・キャスターベルト',
	      shortName: 'キャス腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    },
	    {
	      id: 26,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーベルト',
	      shortName: 'ヒラ腰',
	      job: 0,
	      icon: 'images/item/areki_3/1/b01.png'
	    }
	  ]
	};


/***/ },
/* 8 */
/*!*******************************************************!*\
  !*** ./js-src/data/raids/alexander_tendou_zero_02.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 9,
	  name: 'アレキ天動編零式2層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーバイザー',
	      shortName: 'タンク頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b01_1.png'
	    },
	    {
	      id: 1,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーガントレット',
	      shortName: 'タンク手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b01_2.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーソルレット',
	      shortName: 'タンク足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b01_3.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'アレキサンダー・スレイヤーバイザー',
	      shortName: '竜頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b01_1.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'アレキサンダー・スレイヤーガントレット',
	      shortName: '竜手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b02_2.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'アレキサンダー・スレイヤーソルレット',
	      shortName: '竜足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b02_3.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'アレキサンダー・ストライカーマスク',
	      shortName: 'モンク頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b03_1.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'アレキサンダー・ストライカーグローブ',
	      shortName: 'モンク手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b03_2.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'アレキサンダー・ストライカーサイブーツ',
	      shortName: 'モンク足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b03_3.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'アレキサンダー・レンジャーサークレット',
	      shortName: 'レンジ頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b04_1.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'アレキサンダー・レンジャーグローブ',
	      shortName: 'レンジ手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b04_2.png'
	    },
	    {
	      id: 12,
	      category: 1,
	      name: 'アレキサンダー・レンジャーサイブーツ',
	      shortName: 'レンジ足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b04_3.png'
	    },
	    {
	      id: 13,
	      category: 1,
	      name: 'アレキサンダー・スカウトマスク',
	      shortName: '忍頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b05_1.png'
	    },
	    {
	      id: 14,
	      category: 1,
	      name: 'アレキサンダー・スカウトグローブ',
	      shortName: '忍手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b05_2.png'
	    },
	    {
	      id: 15,
	      category: 1,
	      name: 'アレキサンダー・スカウトサイブーツ',
	      shortName: '忍足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b05_3.png'
	    },
	    {
	      id: 16,
	      category: 1,
	      name: 'アレキサンダー・キャスターフード',
	      shortName: 'キャス頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b06_1.png'
	    },
	    {
	      id: 17,
	      category: 1,
	      name: 'アレキサンダー・キャスターグローブ',
	      shortName: 'キャス手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b06_2.png'
	    },
	    {
	      id: 18,
	      category: 1,
	      name: 'アレキサンダー・キャスターブーツ',
	      shortName: 'キャス足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b06_3.png'
	    },
	    {
	      id: 19,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーフード',
	      shortName: 'ヒラ頭',
	      job: 0,
	      icon: 'images/item/areki_3/2/b07_1.png'
	    },
	    {
	      id: 20,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーグローブ',
	      shortName: 'ヒラ手',
	      job: 0,
	      icon: 'images/item/areki_3/2/b07_2.png'
	    },
	    {
	      id: 21,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーブーツ',
	      shortName: 'ヒラ足',
	      job: 0,
	      icon: 'images/item/areki_3/2/b07_3.png'
	    },
	    {
	      id: 22,
	      category: 3,
	      name: '紺青の硬化薬',
	      shortName: '薬',
	      job: 0,
	      icon: 'images/item/areki_3/2/d01.png'
	    },
	    {
	      id: 23,
	      category: 3,
	      name: '超小型トームストーン',
	      shortName: '石',
	      job: 0,
	      icon: 'images/item/areki_3/2/d02.png'
	    }
	  ]
	};


/***/ },
/* 9 */
/*!*******************************************************!*\
  !*** ./js-src/data/raids/alexander_tendou_zero_03.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 10,
	  name: 'アレキ天動編零式3層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーブリーチ',
	      shortName: 'タンク脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b01.png'
	    },
	    {
	      id: 1,
	      category: 1,
	      name: 'アレキサンダー・スレイヤーブリーチ',
	      shortName: '竜脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b02.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'アレキサンダー・ストライカーブリーチ',
	      shortName: 'モンク脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b03.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'アレキサンダー・レンジャーガスキン',
	      shortName: 'レンジ脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b04.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'アレキサンダー・スカウトガスキン',
	      shortName: '忍脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b05.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'アレキサンダー・キャスターボトム',
	      shortName: 'キャス脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b06.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーボトム',
	      shortName: 'ヒラ脚',
	      job: 0,
	      icon: 'images/item/areki_3/3/b07.png'
	    },
	    {
	      id: 7,
	      category: 3,
	      name: '紺青の強化繊維',
	      shortName: '繊維',
	      job: 0,
	      icon: 'images/item/areki_3/3/d01.png'
	    },
	    {
	      id: 8,
	      category: 3,
	      name: '紺青の強化薬',
	      shortName: '強化薬',
	      job: 0,
	      icon: 'images/item/areki_3/3/d02.png'
	    }
	  ]
	};


/***/ },
/* 10 */
/*!*******************************************************!*\
  !*** ./js-src/data/raids/alexander_tendou_zero_04.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 11,
	  name: 'アレキ天動編零式4層',
	  items: [
	    {
	      id: 0,
	      category: 0,
	      name: 'アレキサンダー・メタルブレード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/areki_3/4/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'アレキサンダー・メタルバックラー',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/areki_3/4/c01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'アレキサンダー・メタルアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/areki_3/4/a03.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'アレキサンダー・メタルディバイダー',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/areki_3/4/a07.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'アレキサンダー・メタルナックル',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/areki_3/4/a02.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'アレキサンダー・メタルスピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/areki_3/4/a04.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'アレキサンダー・メタルダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/areki_3/4/a06.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'アレキサンダー・メタルボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/areki_3/4/a05.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'アレキサンダー・メタルカノン',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/areki_3/4/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'アレキサンダー・メタルロッド',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/areki_3/4/a10.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'アレキサンダー・メタルグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/areki_3/4/a11.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'アレキサンダー・メタルケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/areki_3/4/a09.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'アレキサンダー・メタルコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/areki_3/4/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'アレキサンダー・メタルメーター',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/areki_3/4/a13.png'
	    },
	    {
	      id: 15,
	      category: 1,
	      name: 'アレキサンダー・ディフェンダーメイル',
	      shortName: 'タンク胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b01.png'
	    },
	    {
	      id: 16,
	      category: 1,
	      name: 'アレキサンダー・スレイヤージャケット',
	      shortName: '竜胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b02.png'
	    },
	    {
	      id: 17,
	      category: 1,
	      name: 'アレキサンダー・ストライカージャケット',
	      shortName: 'モンク胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b03.png'
	    },
	    {
	      id: 18,
	      category: 1,
	      name: 'アレキサンダー・レンジャージャケット',
	      shortName: 'レンジ胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b04.png'
	    },
	    {
	      id: 19,
	      category: 1,
	      name: 'アレキサンダー・スカウトコート',
	      shortName: '忍胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b05.png'
	    },
	    {
	      id: 20,
	      category: 1,
	      name: 'アレキサンダー・キャスターコート',
	      shortName: 'キャス胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b06.png'
	    },
	    {
	      id: 21,
	      category: 1,
	      name: 'アレキサンダー・ヒーラーコート',
	      shortName: 'ヒラ胴',
	      job: 0,
	      icon: 'images/item/areki_3/4/b07.png'
	    },
	    {
	      id: 22,
	      category: 4,
	      name: 'アリダイオス・マスターキー',
	      shortName: 'マウント',
	      job: 0,
	      icon: 'images/item/areki_3/4/d01.png'
	    }
	  ]
	};


/***/ },
/* 11 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_01.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: 'アレキ機動編零式1層',
	  id: 0,
	  items: [
	    {
	      id: 0,
	      category: 2,
	      name: 'ゴルディオン・ディフェンダーネックバンド',
	      shortName: 'VIT首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      id: 1,
	      category: 2,
	      name: 'ゴルディオン・ディフェンダーイヤリング',
	      shortName: 'VIT耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      id: 2,
	      category: 2,
	      name: 'ゴルディオン・ディフェンダーリストバンド',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      id: 3,
	      category: 2,
	      name: 'ゴルディオン・ディフェンダーリング',
	      shortName: 'VIT指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      id: 4,
	      category: 2,
	      name: 'ゴルディオン・アタッカーネックバンド',
	      shortName: 'STR首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      id: 5,
	      category: 2,
	      name: 'ゴルディオン・アタッカーイヤリング',
	      shortName: 'STR耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      id: 6,
	      category: 2,
	      name: 'ゴルディオン・アタッカーリストバンド',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      id: 7,
	      category: 2,
	      name: 'ゴルディオン・アタッカーリング',
	      shortName: 'STR指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      id: 8,
	      category: 2,
	      name: 'ゴルディオン・レンジャーネックバンド',
	      shortName: 'DEX首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      id: 9,
	      category: 2,
	      name: 'ゴルディオン・レンジャーイヤリング',
	      shortName: 'DEX耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      id: 10,
	      category: 2,
	      name: 'ゴルディオン・レンジャーリストバンド',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      id: 11,
	      category: 2,
	      name: 'ゴルディオン・レンジャーリング',
	      shortName: 'DEX指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      id: 12,
	      category: 2,
	      name: 'ゴルディオン・キャスターネックバンド',
	      shortName: 'INT首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      id: 13,
	      category: 2,
	      name: 'ゴルディオン・キャスターイヤリング',
	      shortName: 'INT耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      id: 14,
	      category: 2,
	      name: 'ゴルディオン・キャスターリストバンド',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      id: 15,
	      category: 2,
	      name: 'ゴルディオン・キャスターリング',
	      shortName: 'INT指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    },
	    {
	      name: 'ゴルディオン・ヒーラーネックバンド',
	      category: 2,
	      id: 16,
	      shortName: 'MND首',
	      job: 0,
	      icon: 'images/item/areki_z/1/c01.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'ゴルディオン・ヒーラーイヤリング',
	      shortName: 'MND耳',
	      job: 0,
	      icon: 'images/item/areki_z/1/c02.png'
	    },
	    {
	      id: 18,
	      category: 2,
	      name: 'ゴルディオン・ヒーラーリストバンド',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/areki_z/1/c03.png'
	    },
	    {
	      id: 19,
	      category: 2,
	      name: 'ゴルディオン・ヒーラーリング',
	      shortName: 'MND指',
	      job: 0,
	      icon: 'images/item/areki_z/1/c04.png'
	    }
	  ]
	};


/***/ },
/* 12 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_02.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 1,
	  name: 'アレキ機動編零式2層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダーガントレット',
	      shortName: 'タンク手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b01_1.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダーベルト',
	      shortName: 'タンク腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダーソルレット',
	      shortName: 'タンク足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b01_3.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーガントレット',
	      shortName: '竜手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b02_1.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーベルト',
	      shortName: '竜腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーサバトン',
	      shortName: '竜足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b02_3.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'ゴルディオン・ストライカーガントレット',
	      shortName: 'モンク手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b03_1.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'ゴルディオン・ストライカーベルト',
	      shortName: 'モンク腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'ゴルディオン・ストライカーサバトン',
	      shortName: 'モンク足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b03_3.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'ゴルディオン・レンジャーアームガード',
	      shortName: 'レンジ手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b04_1.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'ゴルディオン・レンジャーベルト',
	      shortName: 'レンジ腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 12,
	      category: 1,
	      name: 'ゴルディオン・レンジャーサバトン',
	      shortName: 'レンジ足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b04_3.png'
	    },
	    {
	      id: 13,
	      category: 1,
	      name: 'ゴルディオン・スカウトアームガード',
	      shortName: '忍手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b05_1.png'
	    },
	    {
	      id: 14,
	      category: 1,
	      name: 'ゴルディオン・スカウトベルト',
	      shortName: '忍腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 15,
	      category: 1,
	      name: 'ゴルディオン・スカウトサバトン',
	      shortName: '忍足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b05_3.png'
	    },
	    {
	      id: 16,
	      category: 1,
	      name: 'ゴルディオン・キャスターグローブ',
	      shortName: 'キャス手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b06_1.png'
	    },
	    {
	      id: 17,
	      category: 1,
	      name: 'ゴルディオン・キャスターベルト',
	      shortName: 'キャス腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 18,
	      category: 1,
	      name: 'ゴルディオン・キャスターガンビエラ',
	      shortName: 'キャス足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b06_3.png'
	    },
	    {
	      id: 19,
	      category: 1,
	      name: 'ゴルディオン・ヒーラーグローブ',
	      shortName: 'ヒラ手',
	      job: 0,
	      icon: 'images/item/areki_z/2/b07_1.png'
	    },
	    {
	      id: 20,
	      category: 1,
	      name: 'ゴルディオン・ヒーラーベルト',
	      shortName: 'ヒラ腰',
	      job: 0,
	      icon: 'images/item/areki_z/2/b08.png'
	    },
	    {
	      id: 21,
	      category: 1,
	      name: 'ゴルディオン・ヒーラーガンビエラ',
	      shortName: 'ヒラ足',
	      job: 0,
	      icon: 'images/item/areki_z/2/b07_3.png'
	    },
	    {
	      id: 22,
	      category: 3,
	      name: '青の硬化薬',
	      shortName: '薬',
	      job: 0,
	      icon: 'images/item/areki_z/2/d01.png'
	    }
	  ]
	};


/***/ },
/* 13 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_03.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 2,
	  name: 'アレキ機動編零式3層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダーアーメット',
	      shortName: 'タンク頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b01_1.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダーブリーチ',
	      shortName: 'タンク脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b01_2.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーサレット',
	      shortName: '竜頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b02_1.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーブリーチ',
	      shortName: '竜脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b02_2.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'ゴルディオン・ストライカーサレット',
	      shortName: 'モンク頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b03_1.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'ゴルディオン・ストライカーブリーチ',
	      shortName: 'モンク脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b03_2.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'ゴルディオン・レンジャーフード',
	      shortName: 'レンジ頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b04_1.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'ゴルディオン・レンジャーポレイン',
	      shortName: 'レンジ脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b04_2.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'ゴルディオン・スカウトフード',
	      shortName: '忍頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b05_1.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'ゴルディオン・スカウトポレイン',
	      shortName: '忍脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b05_2.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'ゴルディオン・キャスタークラウン',
	      shortName: 'キャス頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b06_1.png'
	    },
	    {
	      id: 12,
	      category: 1,
	      name: 'ゴルディオン・キャスターブレエット',
	      shortName: 'キャス脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b06_2.png'
	    },
	    {
	      id: 13,
	      category: 1,
	      name: 'ゴルディオン・ヒーラークラウン',
	      shortName: 'ヒラ頭',
	      job: 0,
	      icon: 'images/item/areki_z/3/b07_1.png'
	    },
	    {
	      id: 14,
	      category: 1,
	      name: 'ゴルディオン・ヒーラーブレエット',
	      shortName: 'ヒラ脚',
	      job: 0,
	      icon: 'images/item/areki_z/3/b07_2.png'
	    },
	    {
	      id: 15,
	      category: 3,
	      name: '青の強化繊維',
	      shortName: '繊維',
	      job: 0,
	      icon: 'images/item/areki_z/3/d01.png'
	    }
	  ]
	};


/***/ },
/* 14 */
/*!******************************************************!*\
  !*** ./js-src/data/raids/alexander_kidou_zero_04.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 3,
	  name: 'アレキ機動編零式4層',
	  items: [
	    {
	      id: 0,
	      category: 0,
	      name: 'ゴルディオンブレード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'ゴルディオンシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/areki_z/4/c01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'ゴルディオンアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/areki_z/4/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'ゴルディオングレートソード',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'ゴルディオンセスタス',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/areki_z/4/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'ゴルディオントライデント',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/areki_z/4/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'ゴルディオンバゼラード',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/areki_z/4/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ゴルディオンロングボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/areki_z/4/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ゴルディオンマスケトン',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/areki_z/4/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'ゴルディオンスタッフ',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/areki_z/4/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ゴルディオングリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/areki_z/4/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ゴルディオンケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/areki_z/4/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ゴルディオンコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/areki_z/4/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'ゴルディオンアストロメーター',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/areki_z/4/a13.png'
	    },
	    {
	      id: 15,
	      category: 1,
	      name: 'ゴルディオン・ディフェンダープレートメイル',
	      shortName: 'タンク胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b01.png'
	    },
	    {
	      id: 16,
	      category: 1,
	      name: 'ゴルディオン・スレイヤーメイル',
	      shortName: '竜胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b02.png'
	    },
	    {
	      id: 17,
	      category: 1,
	      name: 'ゴルディオン・ストライカーメイル',
	      shortName: 'モンク胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b03.png'
	    },
	    {
	      id: 18,
	      category: 1,
	      name: 'ゴルディオン・レンジャーコースリット',
	      shortName: 'レンジ胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b04.png'
	    },
	    {
	      id: 19,
	      category: 1,
	      name: 'ゴルディオン・スカウトコースリット',
	      shortName: '忍胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b05.png'
	    },
	    {
	      id: 20,
	      category: 1,
	      name: 'ゴルディオン・キャスターガウン',
	      shortName: 'キャス胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b06.png'
	    },
	    {
	      id: 21,
	      category: 1,
	      name: 'ゴルディオン・ヒーラーガウン',
	      shortName: 'ヒラ胴',
	      job: 0,
	      icon: 'images/item/areki_z/4/b07.png'
	    },
	    {
	      id: 22,
	      category: 3,
	      name: '青の強化薬',
	      shortName: '薬',
	      job: 0,
	      icon: 'images/item/areki_z/4/d02.png'
	    },
	    {
	      id: 23,
	      category: 4,
	      name: 'ゴブリウォーカーギア',
	      shortName: 'タチコマ',
	      job: 0,
	      icon: 'images/item/areki_z/4/d01.png'
	    }
	  ]
	};


/***/ },
/* 15 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_01.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 4,
	  name: '真成1層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'バハムート・ディフェンダーサバトン',
	      shortName: 'タンク足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b01.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'バハムート・ストライカーサークレット',
	      shortName: 'モ頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b02.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'バハムート・ストライカーサッシュ',
	      shortName: 'モ腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'バハムート・スレイヤーヴァンブレイス',
	      shortName: '竜手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b03.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'バハムート・スレイヤータセット',
	      shortName: '竜腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'バハムート・スカウトブレーサー',
	      shortName: '忍手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b04.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'バハムート・スカウトサッシュ',
	      shortName: '忍腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'バハムート・スカウトブーツ',
	      shortName: '忍足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b05.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'バハムート・レンジャーブレーサー',
	      shortName: '詩手',
	      job: 0,
	      icon: 'images/item/sinsei/1/b06.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'バハムート・レンジャーサッシュ',
	      shortName: '詩腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'バハムート・キャスターペタソス',
	      shortName: 'キャス頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b07.png'
	    },
	    {
	      id: 12,
	      category: 1,
	      name: 'バハムート・ヒーラーフード',
	      shortName: 'ヒラ頭',
	      job: 0,
	      icon: 'images/item/sinsei/1/b08.png'
	    },
	    {
	      id: 13,
	      category: 1,
	      name: 'バハムート・ヒーラーシューズ',
	      shortName: 'ヒラ足',
	      job: 0,
	      icon: 'images/item/sinsei/1/b09.png'
	    },
	    {
	      id: 14,
	      category: 2,
	      name: 'バハムート・ディフェンダーブレスレット',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      id: 15,
	      category: 2,
	      name: 'バハムート・ディフェンダーリング',
	      shortName: 'VIT指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      id: 16,
	      category: 2,
	      name: 'バハムート・アタッカーチョーカー',
	      shortName: 'STR首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'バハムート・レンジャーイヤリング',
	      shortName: 'DEX耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      id: 18,
	      category: 2,
	      name: 'バハムート・キャスターチョーカー',
	      shortName: 'INT首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      id: 19,
	      category: 2,
	      name: 'バハムート・キャスターリング',
	      shortName: 'INT指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      id: 20,
	      category: 2,
	      name: 'バハムート・ヒーラーイヤリング',
	      shortName: 'MND耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    }
	  ]
	};


/***/ },
/* 16 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_02.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 5,
	  name: '真成2層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'バハムート・ディフェンダーガントレット',
	      shortName: 'タンク手',
	      job: 0,
	      icon: 'images/item/sinsei/2/b01.png'
	    },
	    {
	      id: 1,
	      category: 1,
	      name: 'バハムート・ストライカーブレーサー',
	      shortName: 'モ手',
	      job: 0,
	      icon: 'images/item/sinsei/2/b02.png'
	    },
	    {
	      id: 2,
	      category: 1,
	      name: 'バハムート・ストライカーブーツ',
	      shortName: 'モ足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b03.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'バハムート・スレイヤーバルビュート',
	      shortName: '竜頭',
	      job: 0,
	      icon: 'images/item/sinsei/2/b04.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'バハムート・スレイヤーメイル',
	      shortName: '竜胴',
	      job: 0,
	      icon: 'images/item/sinsei/2/b05.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'バハムート・スカウトサークレット',
	      shortName: '忍頭',
	      job: 0,
	      icon: 'images/item/sinsei/2/b06.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'バハムート・レンジャーグリーヴ',
	      shortName: '詩足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b07.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'バハムート・キャスターローブ',
	      shortName: 'キャス胴',
	      job: 0,
	      icon: 'images/item/sinsei/2/b08.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'バハムート・キャスターベルト',
	      shortName: 'キャス腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'バハムート・キャスターシューズ',
	      shortName: 'キャス足',
	      job: 0,
	      icon: 'images/item/sinsei/2/b09.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'バハムート・ヒーラーベルト',
	      shortName: 'ヒラ腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'バハムート・ヒーラートンバン',
	      shortName: 'ヒラ脚',
	      job: 0,
	      icon: 'images/item/sinsei/2/b10.png'
	    },
	    {
	      id: 12,
	      category: 2,
	      name: 'バハムート・ディフェンダーチョーカー',
	      shortName: 'VIT首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      id: 13,
	      category: 2,
	      name: 'バハムート・ディフェンダーイヤリング',
	      shortName: 'VIT耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      id: 14,
	      category: 2,
	      name: 'バハムート・アタッカーリング',
	      shortName: 'STR指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      id: 15,
	      category: 2,
	      name: 'バハムート・レンジャーチョーカー',
	      shortName: 'DEX首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      id: 16,
	      category: 2,
	      name: 'バハムート・レンジャーブレスレット',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'バハムート・ヒーラーブレスレット',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    }
	  ]
	};


/***/ },
/* 17 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_03.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 6,
	  name: '真成3層',
	  items: [
	    {
	      id: 0,
	      category: 1,
	      name: 'バハムート・ディフェンダーコロネット',
	      shortName: 'タンク頭',
	      job: 0,
	      icon: 'images/item/sinsei/3/b01.png'
	    },
	    {
	      id: 1,
	      category: 1,
	      name: 'バハムート・ディフェンダータセット',
	      shortName: 'タンク腰',
	      job: 0,
	      icon: 'images/item/sinsei/b01.png'
	    },
	    {
	      id: 3,
	      category: 1,
	      name: 'バハムート・ディフェンダーサルエル',
	      shortName: 'タンク脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b02.png'
	    },
	    {
	      id: 4,
	      category: 1,
	      name: 'バハムートシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/sinsei/3/c01.png'
	    },
	    {
	      id: 5,
	      category: 1,
	      name: 'バハムート・ストライカーシクラス',
	      shortName: 'モ胴',
	      job: 0,
	      icon: 'images/item/sinsei/3/b03.png'
	    },
	    {
	      id: 6,
	      category: 1,
	      name: 'バハムート・スレイヤーグリーヴ',
	      shortName: '竜足',
	      job: 0,
	      icon: 'images/item/sinsei/3/b04.png'
	    },
	    {
	      id: 7,
	      category: 1,
	      name: 'バハムート・スカウトスロップ',
	      shortName: '忍脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b05.png'
	    },
	    {
	      id: 8,
	      category: 1,
	      name: 'バハムート・レンジャーシャポー',
	      shortName: '詩頭',
	      job: 0,
	      icon: 'images/item/sinsei/3/b06.png'
	    },
	    {
	      id: 9,
	      category: 1,
	      name: 'バハムート・レンジャーブリーチ',
	      shortName: '詩脚',
	      job: 0,
	      icon: 'images/item/sinsei/3/b07.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'バハムート・キャスターグローブ',
	      shortName: 'キャス手',
	      job: 0,
	      icon: 'images/item/sinsei/3/b08.png'
	    },
	    {
	      id: 11,
	      category: 1,
	      name: 'バハムート・ヒーラーグローブ',
	      shortName: 'ヒラ手',
	      job: 0,
	      icon: 'images/item/sinsei/3/b09.png'
	    },
	    {
	      id: 12,
	      category: 2,
	      name: 'バハムート・アタッカーイヤリング',
	      shortName: 'STR耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      id: 13,
	      category: 2,
	      name: 'バハムート・アタッカーブレスレット',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      id: 14,
	      category: 2,
	      name: 'バハムート・レンジャーリング',
	      shortName: 'DEX指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    },
	    {
	      id: 15,
	      category: 2,
	      name: 'バハムート・キャスターイヤリング',
	      shortName: 'INT耳',
	      job: 0,
	      icon: 'images/item/sinsei/c02.png'
	    },
	    {
	      id: 16,
	      category: 2,
	      name: 'バハムート・キャスターブレスレット',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/sinsei/c03.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'バハムート・ヒーラーチョーカー',
	      shortName: 'MND首',
	      job: 0,
	      icon: 'images/item/sinsei/c01.png'
	    },
	    {
	      id: 18,
	      category: 2,
	      name: 'バハムート・ヒーラーリング',
	      shortName: 'MND指',
	      job: 0,
	      icon: 'images/item/sinsei/c04.png'
	    }
	  ]
	};


/***/ },
/* 18 */
/*!************************************************!*\
  !*** ./js-src/data/raids/bahamut_sinsei_04.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = {
	  id: 7,
	  name: '真成4層',
	  items: [
	    {
	      id: 0,
	      category: 0,
	      name: 'バハムートブレード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/sinsei/4/a01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'バハムートバルディッシュ',
	      shortName: '斧',
	      job: 1,
	      icon: 'images/item/sinsei/4/a02.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'バハムートクロー',
	      shortName: '爪',
	      job: 6,
	      icon: 'images/item/sinsei/4/a03.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'バハムートスピア',
	      shortName: '槍',
	      job: 6,
	      icon: 'images/item/sinsei/4/a04.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'バハムートダガー',
	      shortName: '双剣',
	      job: 6,
	      icon: 'images/item/sinsei/4/a06.png'
	    },

	    {
	      id: 5,
	      category: 0,
	      name: 'バハムートロングボウ',
	      shortName: '弓',
	      job: 6,
	      icon: 'images/item/sinsei/4/a05.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'バハムートスタッフ',
	      shortName: '黒杖',
	      job: 6,
	      icon: 'images/item/sinsei/4/a08.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'バハムートグリモア',
	      shortName: '召本',
	      job: 6,
	      icon: 'images/item/sinsei/4/a09.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'バハムートケーン',
	      shortName: '白杖',
	      job: 6,
	      icon: 'images/item/sinsei/4/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'バハムートコーデックス',
	      shortName: '学本',
	      job: 6,
	      icon: 'images/item/sinsei/4/a10.png'
	    },
	    {
	      id: 10,
	      category: 1,
	      name: 'バハムート・ディフェンダーアーマー',
	      shortName: 'タンク胴',
	      job: 0,
	      icon: 'images/item/sinsei/4/b01.png'
	    },

	    {
	      id: 11,
	      category: 1,
	      name: 'バハムート・ストライカースロップ',
	      shortName: 'モ脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b02.png'
	    },

	    {
	      id: 12,
	      category: 1,
	      name: 'バハムート・スレイヤーブリーチ',
	      shortName: '竜脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b03.png'
	    },

	    {
	      id: 13,
	      category: 1,
	      name: 'バハムート・スカウトシクラス',
	      shortName: '忍胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b04.png'
	    },

	    {
	      id: 14,
	      category: 1,
	      name: 'バハムート・レンジャータバード',
	      shortName: '詩人胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b05.png'
	    },

	    {
	      id: 15,
	      category: 1,
	      name: 'バハムート・キャスタートンバン',
	      shortName: 'キャス脚',
	      job: 6,
	      icon: 'images/item/sinsei/4/b06.png'
	    },

	    {
	      id: 16,
	      category: 1,
	      name: 'バハムート・ヒーラーローブ',
	      shortName: 'ヒラ胴',
	      job: 6,
	      icon: 'images/item/sinsei/4/b07.png'
	    }
	  ]
	};


/***/ },
/* 19 */
/*!***************************************!*\
  !*** ./js-src/data/extremes/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var IdData = __webpack_require__(/*! ../id-data */ 3);

	module.exports = [
	  new IdData(__webpack_require__(/*! ./sophia */ 20)),
	  new IdData(__webpack_require__(/*! ./nidhogg */ 21)),
	  new IdData(__webpack_require__(/*! ./sephiroth */ 22)),
	  new IdData(__webpack_require__(/*! ./nights_of_round */ 23)),
	  new IdData(__webpack_require__(/*! ./ravana */ 24)),
	  new IdData(__webpack_require__(/*! ./shiva */ 25)),
	];



/***/ },
/* 20 */
/*!****************************************!*\
  !*** ./js-src/data/extremes/sophia.js ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ソフィア',
	  id: 5,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ゴッデスラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'ブレード・オブ・ソフィア',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_sophia/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'シールド・オブ・ソフィア',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_sophia/b01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'アクス・オブ・ソフィア',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_sophia/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'ソード・オブ・ソフィア',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/goku_sophia/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'フィスト・オブ・ソフィア',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_sophia/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'パイク・オブ・ソフィア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_sophia/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'エッジ・オブ・ソフィア',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_sophia/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ボウ・オブ・ソフィア',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_sophia/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ファイア・オブ・ソフィア',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_sophia/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'ポール・オブ・ソフィア',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_sophia/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ワード・オブ・ソフィア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_sophia/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ケーン・オブ・ソフィア',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_sophia/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ソング・オブ・ソフィア',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_sophia/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'スター・オブ・ソフィア',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/goku_sophia/a13.png'
	    }
	  ]
	};


/***/ },
/* 21 */
/*!*****************************************!*\
  !*** ./js-src/data/extremes/nidhogg.js ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ニーズヘッグ',
	  id: 0,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ダークラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'ニーズヘッグブレード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'ニーズヘッグシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_nees/b01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'ニーズヘッグアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_nees/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'ニーズヘッグディバイダー',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'ニーズヘッグナックル',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_nees/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'ニーズヘッグスピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_nees/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'ニーズヘッグダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_nees/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ニーズヘッグボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_nees/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ニーズヘッグハンドゴンネ',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_nees/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'ニーズヘッグロッド',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_nees/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ニーズヘッググリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_nees/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ニーズヘッグケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_nees/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ニーズヘッグコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_nees/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'ニーズヘッグスターグローブ',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/goku_nees/a13.png'
	    }
	  ]
	};


/***/ },
/* 22 */
/*!*******************************************!*\
  !*** ./js-src/data/extremes/sephiroth.js ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極セフィロト',
	  id: 1,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ウォーリングラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'ブレード・オブ・セフィロト',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'シールド・オブ・セフィロト',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_sefi/b01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'アクス・オブ・セフィロト',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_sefi/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'エッジ・オブ・セフィロト',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'フィスト・オブ・セフィロト',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_sefi/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'パイク・オブ・セフィロト',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_sefi/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'ポインツ・オブ・セフィロト',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_sefi/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ボウ・オブ・セフィロト',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_sefi/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ファイア・オブ・セフィロト',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_sefi/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'スタッフ・オブ・セフィロト',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_sefi/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ワード・オブ・セフィロト',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_sefi/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ケーン・オブ・セフィロト',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_sefi/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ソング・オブ・セフィロト',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_sefi/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'スター・オブ・セフィロト',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/goku_sefi/a13.png'
	    }
	  ]
	};


/***/ },
/* 23 */
/*!*************************************************!*\
  !*** ./js-src/data/extremes/nights_of_round.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ナイツ・オブ・ラウンド',
	  id: 2,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ラナー・オブ・ラウンドホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'ヘヴンスソード',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'ヘヴンスシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_kor/b01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'ヘヴンスアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_kor/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'ヘヴンスクレイモア',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'ヘヴンスナックル',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_kor/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'ヘヴンスハルバード',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_kor/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'ヘヴンスダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_kor/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ヘヴンスボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_kor/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ヘヴンスファイア',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_kor/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'ヘヴンススタッフ',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_kor/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ヘヴンスグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_kor/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ヘヴンスケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_kor/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ヘヴンスコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_kor/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'ヘヴンスメーター',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/goku_kor/a13.png'
	    }
	  ]
	};


/***/ },
/* 24 */
/*!****************************************!*\
  !*** ./js-src/data/extremes/ravana.js ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極ラーヴァナ',
	  id: 3,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ラースラナーホイッスル',
	      shortName: '鳥',
	      job: 0,
	      icon: 'images/item/common/mount01.png'
	    },
	    {
	      id: 1,
	      category: 0,
	      name: 'ラーヴァナシャムシール',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'ラーヴァナスクトゥム',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_ravana/b01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'ラーヴァナバトルアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_ravana/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'ラーヴァナクレイモア',
	      shortName: '暗剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a03.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'ラーヴァナクロー',
	      shortName: '拳',
	      job: 0,
	      icon: 'images/item/goku_ravana/a04.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'ラーヴァナスピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_ravana/a06.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'ラーヴァナクリス',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_ravana/a05.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'ラーヴァナボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_ravana/a07.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'ラーヴァナマスケトン',
	      shortName: '銃',
	      job: 0,
	      icon: 'images/item/goku_ravana/a08.png'
	    },
	    {
	      id: 10,
	      category: 0,
	      name: 'ラーヴァナロングポール',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_ravana/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'ラーヴァナグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_ravana/a10.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'ラーヴァナケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_ravana/a11.png'
	    },
	    {
	      id: 13,
	      category: 0,
	      name: 'ラーヴァナコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_ravana/a12.png'
	    },
	    {
	      id: 14,
	      category: 0,
	      name: 'ラーヴァナプラニスフィア',
	      shortName: '天球',
	      job: 0,
	      icon: 'images/item/goku_ravana/a13.png'
	    }
	  ]
	};



/***/ },
/* 25 */
/*!***************************************!*\
  !*** ./js-src/data/extremes/shiva.js ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = {
	  name: '極シヴァ',
	  id: 4,
	  items: [
	    {
	      id: 0,
	      category: 4,
	      name: 'ボレアスホイッスル',
	      shortName: '馬',
	      job: 0,
	      icon: 'images/item/goku_siva/e01.png'
	    },
	    {
	      id: 2,
	      category: 0,
	      name: 'シヴァ・アイスブランド',
	      shortName: '剣',
	      job: 0,
	      icon: 'images/item/goku_siva/a01.png'
	    },
	    {
	      id: 3,
	      category: 0,
	      name: 'シヴァ・アイスアクス',
	      shortName: '斧',
	      job: 0,
	      icon: 'images/item/goku_siva/a02.png'
	    },
	    {
	      id: 4,
	      category: 0,
	      name: 'シヴァ・アイスシールド',
	      shortName: '盾',
	      job: 0,
	      icon: 'images/item/goku_siva/d01.png'
	    },
	    {
	      id: 5,
	      category: 0,
	      name: 'シヴァ・アイスクロー',
	      shortName: '爪',
	      job: 0,
	      icon: 'images/item/goku_siva/a03.png'
	    },
	    {
	      id: 6,
	      category: 0,
	      name: 'シヴァ・アイススピア',
	      shortName: '槍',
	      job: 0,
	      icon: 'images/item/goku_siva/a04.png'
	    },
	    {
	      id: 7,
	      category: 0,
	      name: 'シヴァ・アイスダガー',
	      shortName: '双剣',
	      job: 0,
	      icon: 'images/item/goku_siva/a06.png'
	    },
	    {
	      id: 8,
	      category: 0,
	      name: 'シヴァ・アイスボウ',
	      shortName: '弓',
	      job: 0,
	      icon: 'images/item/goku_siva/a05.png'
	    },
	    {
	      id: 9,
	      category: 0,
	      name: 'シヴァ・アイスロッド',
	      shortName: '黒杖',
	      job: 0,
	      icon: 'images/item/goku_siva/a07.png'
	    },

	    {
	      id: 10,
	      category: 0,
	      name: 'シヴァ・アイスグリモア',
	      shortName: '召本',
	      job: 0,
	      icon: 'images/item/goku_siva/a09.png'
	    },

	    {
	      id: 11,
	      category: 0,
	      name: 'シヴァ・アイスケーン',
	      shortName: '白杖',
	      job: 0,
	      icon: 'images/item/goku_siva/a08.png'
	    },

	    {
	      id: 12,
	      category: 0,
	      name: 'シヴァ・アイスコーデックス',
	      shortName: '学本',
	      job: 0,
	      icon: 'images/item/goku_siva/a10.png'
	    },

	    {
	      id: 13,
	      category: 2,
	      name: 'アイス・ディフェンダーブレスレット',
	      shortName: 'VIT腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },

	    {
	      id: 14,
	      category: 2,
	      name: 'アイス・アタッカーブレスレット',
	      shortName: 'STR腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },

	    {
	      id: 15,
	      category: 2,
	      name: 'アイス・レンジャーブレスレット',
	      shortName: 'DEX腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },
	    {
	      id: 16,
	      category: 2,
	      name: 'アイス・キャスターブレスレット',
	      shortName: 'INT腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    },
	    {
	      id: 17,
	      category: 2,
	      name: 'アイス・ヒーラーブレスレット',
	      shortName: 'MND腕',
	      job: 0,
	      icon: 'images/item/goku_siva/c01.png'
	    }
	  ]
	};


/***/ },
/* 26 */
/*!********************************!*\
  !*** ./js-src/index/config.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);

	function Config() {
	  this.categoryEl = document.querySelector('#select-category');
	  this.instanceEl = document.querySelector('#select-id');

	  // クリア
	  this.clearEl = document.querySelector('.m-clear button');

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
	    store.setInstance(parseInt(self.instanceEl.value));
	  }, false);

	  this.clearEl.addEventListener('click', function () {
	    store.clear();
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
	  store.getInstances().forEach(function (instance) {
	    html += '<option value="' + instance.id + '">' + instance.name + '</option>';
	  });
	  this.instanceEl.innerHTML = html;
	  this.instanceEl.value = store.data.id;
	};

	p.renderOptionLimit = function () {
	  var idData = store.getInstance();
	  this.limit.value = store.data.options.limit;
	  this.mount.value = store.data.options.mount;
	  this.mountContainer.classList.toggle('is-hide', !idData.hasMount());
	};

	module.exports = Config;

/***/ },
/* 27 */
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



/***/ },
/* 28 */
/*!********************************!*\
  !*** ./js-src/index/member.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var store = __webpack_require__(/*! ./store */ 2);
	var modal = __webpack_require__(/*! ./select-item-modal */ 29);

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

/***/ },
/* 29 */
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


/***/ }
/******/ ]);