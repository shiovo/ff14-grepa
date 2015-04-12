(function () {
'use strict';

var jobs = [
	{name:'ナイト', icon:'images/dummy/job.png'},
	{name:'戦士', icon:'images/dummy/job.png'},
	{name:'白魔導士', icon:'images/dummy/job.png'},
	{name:'学者', icon:'images/dummy/job.png'},
	{name:'竜騎士', icon:'images/dummy/job.png'},
	{name:'モンク', icon:'images/dummy/job.png'},
	{name:'忍者', icon:'images/dummy/job.png'},
	{name:'詩人', icon:'images/dummy/job.png'},
	{name:'召還士', icon:'images/dummy/job.png'},
	{name:'黒魔導士', icon:'images/dummy/job.png'}
];

var data = [
	// {
	// 	name: '討伐・討滅戦',
	// 	ids: [
	// 			{
	// 			name: '極シヴァ',
	// 			items: [
	// 				{
	// 					name: 'ばはむーとタンク胴',
	// 					shortName: 'タンク胴',
	// 					job: 0,
	// 					icon: 'images/dummy/5faf78c6822.png'
	// 				},
	// 				{
	// 					name: 'ばはむーと斧',
	// 					shortName: '斧',
	// 					job: 1,
	// 					icon: 'images/dummy/5faf78c6822.png'
	// 				},
	// 				{
	// 					name: 'ばはむーと剣',
	// 					shortName: '剣',
	// 					job: 0,
	// 					icon: 'images/dummy/5faf78c6822.png'
	// 				},
	// 			]
	// 		}
	// 	]
	// },
	{
		name: 'レイド',
		ids: [
			{
				name: '真成1層',
				items: [
					{
						name: 'ばはむーとタンク胴',
						shortName: 'タンク胴',
						job: 0,
						icon: 'images/dummy/5faf78c6822.png'
					},
					{
						name: 'ばはむーと斧',
						shortName: '斧',
						job: 1,
						icon: 'images/dummy/5faf78c6822.png'
					},
					{
						name: 'ばはむーと剣',
						shortName: '剣',
						job: 0,
						icon: 'images/dummy/5faf78c6822.png'
					},
				]
			},
			{
				name: '真成2層',
				items: [
					{
						name: 'ばはむーとタンク耳',
						shortName: 'タンク耳',
						job: 0,
						icon: 'images/dummy/5faf78c6822.png'
					},
					{
						name: 'ばはむーと腕',
						shortName: 'タンク腕',
						job: 1,
						icon: 'images/dummy/5faf78c6822.png'
					},
					{
						name: 'ばはむーと盾',
						shortName: '盾',
						job: 0,
						icon: 'images/dummy/5faf78c6822.png'
					},
				]
			},
			{
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
						name: 'バハムート・ディフェンダーアーマー',
						shortName: 'タンク胴',
						job: 0,
						icon: 'images/item/sinsei/4/.png'
					},
					{
						name: 'バハムートクロー',
						shortName: '爪',
						job: 6,
						icon: 'images/item/sinsei/4/a03.png'
					},
					{
						name: 'バハムート・ストライカースロップ',
						shortName: 'モンク脚',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートスピア',
						shortName: '槍',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムート・スレイヤーブリーチ',
						shortName: '竜脚',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートダガー',
						shortName: '双剣',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムート・スカウトシクラス',
						shortName: '忍脚',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートロングボウ',
						shortName: '弓',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムート・レンジャータバード',
						shortName: '詩人胴',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートスタッフ',
						shortName: '黒杖',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートグリモア',
						shortName: '召本',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムート・キャスタートンバン',
						shortName: 'キャス脚',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートケーン',
						shortName: '白杖',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムートコーデックス',
						shortName: '学本',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
					{
						name: 'バハムート・ヒーラーローブ',
						shortName: 'ヒラ',
						job: 6,
						icon: 'images/item/sinsei/4/a02.png'
					},
				]
			}
		]
	}
];

function getIds(index) {
	return data[index].ids;
}

function getItems(i, l) {
	return getIds(i)[l].items;
}

var selectCategory = document.getElementById('select-category');
var selectId = document.getElementById('select-id');
var members = document.querySelector('#members');
var selectItems = document.querySelectorAll('#members select');
var clearAll = document.querySelector('.m-clear .btn-text');
var macroText = document.querySelector('#macro-text');
var showName = document.querySelector('#switch-name2');

function save() {
	var memberdata = [];
	var memberRows = members.querySelectorAll('tbody tr');
	for(var i=0,l=memberRows.length;i<l;i++) {
		memberdata.push({
			name: memberRows.item(i).querySelector('.input-name').value || '',
			item: memberRows.item(i).querySelector('.select-item').selectedIndex || 0,
			selected: memberRows.item(i).classList.contains('is-selected')
		});
	}
	localStorage.setItem('data', JSON.stringify({
		category: selectCategory.selectedIndex,
		id: selectId.selectedIndex,
		member: memberdata
	}));
}

function clearSaveData() {
	localStorage.removeItem('data');
}

function restore() {
	var json = localStorage.getItem('data');
	if (!json) {
		return;
	}

	var obj = JSON.parse(json);

	selectCategory.selectedIndex = obj.category;
	selectCategory.dispatchEvent(new Event('change'));
	selectId.selectedIndex = obj.id;
	selectId.dispatchEvent(new Event('change'));

	var memberRows = members.querySelectorAll('tbody tr');
	obj.member.forEach(function (member, i) {
		var name = memberRows.item(i).querySelector('.input-name');
		name.value = member.name;
		name.dispatchEvent(new Event('change', {bubbles:true}));

		var item = memberRows.item(i).querySelector('.select-item');
		item.selectedIndex = member.item;
		item.dispatchEvent(new Event('change', {bubbles:true}));

		if (member.selected) {
			memberRows.item(i).querySelector('.btn-text').dispatchEvent(
				new MouseEvent('click', {bubbles:true}));
		}
	});
}

function renderMacroText() {
	var text = '';
	var isShowName = showName.checked === true;
	var selected = document.querySelectorAll('.is-selected');
	if (isShowName) {
		var names = [];
		var items = [];
		var name;
		var namesMaxLength = 0;
		var lines = [];
		for (var i=0,l=selected.length;i<l;i++) {
			name = selected.item(i).querySelector('.td-name input').value || '';
			namesMaxLength = Math.max(namesMaxLength, name.length);
			names.push(name);

			var item = selected.item(i).querySelector('.select-item')
			items.push(item.options[item.selectedIndex].text);
		}

		for (i=0,l=names.length;i<l;i++) {
			name = names[i] + Array(namesMaxLength - names[i].length + 1).join(' ');
			lines.push('/p ' + name + ' ' + items[i]);
		}

		text = lines.join('\n');
	}
	else {
		var items = [];
		for (var i=0,l=selected.length;i<l;i++) {
			var item = selected.item(i).querySelector('.select-item')
			items.push(item.options[item.selectedIndex].text);
		}

		text = items.length ? '/p 〆:' + items.join(' ') : '';
	}

	macroText.value = text;
}

(function () {
	var html = '';
	for (var i=0,l=data.length;i<l;i++) {
		html += '<option value="'+i+'">'+data[i].name+'</option>';
	}
	selectCategory.innerHTML = html;
	selectCategory.selectedIndex = 0;
})();

document.querySelector('.l-macro .m-switch').addEventListener('change', renderMacroText, false);

selectCategory.addEventListener('change', function () {
	var ids = getIds(this.selectedIndex);
	var html = '';

	for (var i=0,l=ids.length;i<l;i++) {
		html += '<option value="'+i+'">'+ids[i].name+'</option>';
	}

	selectId.innerHTML = html;
	selectId.selectedIndex = 0;
	selectId.dispatchEvent(new Event('change'));
}, false);

selectId.addEventListener('change', function() {
	var items = getItems(selectCategory.selectedIndex, this.selectedIndex);
	var html = '';

	var i,l;

	for (i=0,l=items.length;i<l;i++) {
		html += '<option value="'+i+'">'+items[i].shortName+'</option>';
	}

	var selectItem;
	for (i=0,l=selectItems.length;i<l;i++) {
		selectItem = selectItems.item(i);
		selectItem.innerHTML = html;
		selectItem.selectedIndex = 0;
		selectItem.dispatchEvent(new Event('change', {bubbles:true}));
	}
}, false);

members.addEventListener('change', function(e){
	if(e.target.classList.contains('input-name')){
		e.target.nextSibling.innerHTML = e.target.value;
	}else if(e.target.classList.contains('select-item')){
		var item = getItems(selectCategory.selectedIndex,selectId.selectedIndex)[e.target.selectedIndex];
		var dest = e.target.nextSibling;

		dest.querySelector('figure img').src = item.icon;
		dest.querySelector('figcaption span').innerHTML = item.shortName;
		dest.querySelector('figcaption small').innerHTML = '<' + item.name + '>';

		var btnText = e.target.parentNode.parentNode.querySelector('.btn-text');

		btnText.classList.add('is-edit');
		btnText.dispatchEvent(new Event('click', {bubbles:true}));
	}

}, false);

members.addEventListener('click', function(e){
 	if(e.target.classList.contains('btn-text')){
 		if (e.target.classList.contains('is-edit')){
 			e.target.classList.remove('is-edit');
			e.target.parentNode.parentNode.classList.remove('is-selected');
			e.target.innerHTML = '決定';
 		}else{
 			e.target.classList.add('is-edit');
			e.target.parentNode.parentNode.classList.add('is-selected');
			e.target.innerHTML = '編集';

			save();
 		}

 		if (e instanceof MouseEvent) {
 			var selected = document.querySelectorAll('.is-selected');
 			var selectedIdxs = [];
 			for (var i=0,l=selected.length;i<l;i++) {
 				selectedIdxs.push(selected.item(i).querySelector('.select-item').selectedIndex);
 			}

 			var trs = members.querySelectorAll('tbody tr');
 			var select;
 			var options;
 			var j,jl;
 			var current;
 			for (i=0,l=trs.length;i<l;i++) {
 				if (trs.item(i).classList.contains('is-selected')) {
 					continue;
 				}

 				select = trs.item(i).querySelector('.select-item');
 				options = select.querySelectorAll('option');
 				current = null;
 				for (j=0,jl=options.length;j<jl;j++) {
 					options.item(j).disabled = selectedIdxs.indexOf(parseInt(options.item(j).value)) >= 0;
 					if (current === null && !options.item(j).disabled) {
 						current = j;
 					}
 				}
 				select.selectedIndex = current;
 				select.dispatchEvent(new Event('change', {bubbles: true}));
 			}
 		}

		renderMacroText();
	}
}, false);

clearAll.addEventListener('click', function (e) {
	var names = document.querySelectorAll('.input-name');
	for (var i=0,l=names.length;i<l;i++) {
		names.item(i).value = '';
	}

	selectCategory.selectedIndex = 0;
	selectCategory.dispatchEvent(new Event('change'));

	if (e instanceof MouseEvent) {
		clearSaveData();
	}
}, false);

clearAll.dispatchEvent(new Event('click'));
restore();


})();