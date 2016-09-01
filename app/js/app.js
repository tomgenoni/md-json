// Variables

var entires  = document.querySelector('#entires');
var nav      = document.querySelector('#nav');
var filter   = document.querySelector('#nav-filter');

// Listeners

filter.addEventListener('keyup',filterNav);

// Functions

function filterNav() {
    var inputValue = filter.value.toLowerCase();
    var navItems = document.querySelectorAll('#nav .nav__item');
    navItems.forEach(function(item, index){
        item.classList.remove('hidden')
        var text = item.textContent.toLowerCase();
        if ( !text.includes(inputValue) ) {
            item.classList.add('hidden');
        }
    });
}

// Handlebars

var hbsEntry = document.querySelector('#hbs-entry');
var hbsNav   = document.querySelector('#hbs-nav');

Handlebars.registerHelper('createID', function(context, options) {
    id = context.replace(/([^A-Za-z0-9[\]{}_.:-])\s?/g, '').toLowerCase();
    return id;
});

var template      = Handlebars.compile(hbsNav.textContent);
var html          = template(data);
nav.innerHTML     = html;

var template      = Handlebars.compile(hbsEntry.textContent);
var html          = template(data);
entires.innerHTML = html;
