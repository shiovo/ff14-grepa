var store  = require('./index/store');
var Config = require('./index/config');
var Macro  = require('./index/macro');
var Member = require('./index/member');

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
