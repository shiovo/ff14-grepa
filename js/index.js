(function () {
'use strict';

var jobs = [
	{name:'ナイト', icon:'images/dummy/job.png'},
	{name:'戦士', icon:'images/dummy/job.png'}
];

var data = [
	{
		name: '討伐・討滅戦',
		ids: [
		]
	},
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
var selectItems = document.querySelectorAll('#members select');

(function () {
	var html = '';
	for (var i=0,l=data.length;i<l;i++) {
		html += '<option value="'+i+'">'+data[i].name+'</option>';
	}
	selectCategory.innerHTML = html;
	selectCategory.selectedIndex = 0;
})();

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
	}

}, false);

selectCategory.dispatchEvent(new Event('change'));



})();