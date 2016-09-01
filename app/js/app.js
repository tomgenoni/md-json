var entires  = document.querySelector('#entires');
var nav      = document.querySelector('#nav');

var hbsEntry = document.querySelector('#hbs-entry');
var hbsNav   = document.querySelector('#hbs-nav');

var template      = Handlebars.compile(hbsNav.textContent);
var html          = template(data);
nav.innerHTML     = html;

var template      = Handlebars.compile(hbsEntry.textContent);
var html          = template(data);
entires.innerHTML = html;
