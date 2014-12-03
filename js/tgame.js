$(document).ready(function() {





  // ----------------------
  // touchmap________
  // ----------------------

var rugge = $('.planet.rugge');
var den = $('.planet.den');
var planet = $('.planet');

var ruggeNav = rugge.find('span').text();
var denNav = den.find('span').text();



//faccio il mining delle navicelle sui pianeti   base
setInterval(function() {
  ++ ruggeNav;
  ++ denNav;
  rugge.find('span').text(ruggeNav);
  den.find('span').text(denNav);
}, 10000);




});
