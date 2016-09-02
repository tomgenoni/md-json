// Variables

var entires   = document.querySelector('#entires');
var navFilter = document.querySelector('#nav-filter');
var nav       = document.querySelector('#nav');

// Listeners

navFilter.addEventListener('keyup', filterNav);
nav.addEventListener('click', clearFilter);
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

function clearFilter() {
    navFilter.value = '';
    filterNav();
}

// Handlebars

var hbsFilter = document.querySelector('#hbs-filter');
var hbsEntry  = document.querySelector('#hbs-entry');

// Generate IDs so the nav items point to the IDs in the content
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

// Copy to clipboard

var clipboard = new Clipboard('.clipboard', {
    target: function(trigger) {
        return trigger.previousSibling;
    }
});

clipboard.on('success', function(e) {
    e.trigger.classList.add("success")
    setTimeout(function(){
        e.trigger.classList.remove("success")
    }, 2000)
    e.clearSelection();
});
