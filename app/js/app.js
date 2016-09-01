// Variables

var entires   = document.querySelector('#entires');
var navFilter = document.querySelector('#nav-filter');
var nav       = document.querySelector('#nav');

// Listeners

navFilter.addEventListener('keyup', filterNav);
window.addEventListener('load', init);


// Functions

function filterNav() {
    var navFilterValue = navFilter.value;
    if (navFilterValue == null || navFilterValue == ' ') return;

    var filterItems = document.querySelectorAll('#nav .nav__item');
    filterItems.forEach(function(item, index){
        item.classList.remove('is-hidden');
        // Both strings lowercase to equalize
        var text = item.textContent.toLowerCase();
        if ( !text.includes(navFilterValue.toLowerCase()) ) {
            item.classList.add('is-hidden');
        }
    });
}

// Handlebars

var hbsEntry  = document.querySelector('#hbs-entry');
var hbsFilter = document.querySelector('#hbs-filter');

Handlebars.registerHelper('createID', function(context, options) {
    id = context.toLowerCase().replace(/[^\w]+/g, '-');
    return id;
});

function init() {
    // Load the main navigation
    var template            = Handlebars.compile(hbsFilter.textContent);
    var html                = template(data);
    nav.innerHTML = html;

    // Load the body content
    var template            = Handlebars.compile(hbsEntry.textContent);
    var html                = template(data);
    entires.innerHTML       = html;
}
