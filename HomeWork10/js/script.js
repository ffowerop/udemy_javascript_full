window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    let menuTab = document.body.querySelector('.info-header');
    let menuTabItems = menuTab.querySelectorAll('.info-header-tab');
    let contentTab = document.body.querySelectorAll('.info-tabcontent');
    console.log(menuTabItems);
    console.log(contentTab);

    let hideTabContent = function(tab) {
        if (!tab.classList.contains('hide')) {
            tab.classList.remove('show');
            tab.classList.add('hide');
        }
    };
    
    let showTabContent = function(tab) {
        if (tab.classList.contains('hide')) {
            tab.classList.remove('hide');
            tab.classList.add('show');
        }
    };

    contentTab.forEach(hideTabContent);
    showTabContent(contentTab[0]);

    menuTab.addEventListener('click', function(event) {
        let et = event.target;
        if (et && et.classList.contains('info-header-tab')) {
            menuTabItems.forEach(function(item, i) {
                if (item === et) {
                    showTabContent(contentTab[i]);
                } else {
                    hideTabContent(contentTab[i]);
                }
            });
        }
        if (event.target in menuTabItems) {
            console.log(event.target);
            contentTab.map(hideTabContent);
            showTabContent(contentTab[menuTab.indexOf(event.target)]);
        }
    });
});