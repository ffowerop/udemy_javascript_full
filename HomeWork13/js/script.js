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

    /// timer \\\
    
    const DEADLINE = '2019-10-27';

    function getTimeInterval(deadline) {
        let intervalSeconds = Math.floor((new Date(deadline) - Date.now()) / 1000);

        return {
            total : intervalSeconds,
            hours : Math.floor(intervalSeconds/3600),
            minutes : Math.floor(intervalSeconds/60)%60,
            seconds : intervalSeconds%60,
        };
    }

    (function setClock(id, endtime) {
        const timerBlock = document.getElementById(id);
        const hours = timerBlock.querySelector('.hours');
        const minutes = timerBlock.querySelector('.minutes');
        const seconds = timerBlock.querySelector('.seconds');

        (function updateClock() {
            const interval = getTimeInterval(DEADLINE);
            if (interval.total <= 0) {
                timerBlock.innerHTML = '00:00:00';
                return;
            }
            hours.textContent = (interval.hours).toString().padStart(2,'0');
            minutes.textContent = (interval.minutes).toString().padStart(2,'0');
            seconds.textContent = (interval.seconds).toString().padStart(2,'0');
            
            setTimeout(updateClock, 1000);
        })();
    })('timer');
    

    /// POPUP WINDOW \\\

    let popUpWindow = function(openButton, popupWindow, closeButton) {
        openButton.addEventListener('click', function() {    
            popupWindow.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.classList.add('more-splash');
            //let self = this;
            closeButton.addEventListener('click',function() {
                popupWindow.style.display = 'none';
                document.body.style.overflow = '';
                openButton.classList.remove('more-splash');
                this.removeEventListener('click', addEventListener);
            });
        });
    };

    let more = document.querySelector('.more');
    let overlay = document.querySelector('.overlay');
    let close = document.querySelector('.popup-close');
    
    popUpWindow(more, overlay, close);

    let showInfoButtons = document.querySelectorAll('.description-btn');
    showInfoButtons.forEach(function(button){
        popUpWindow(button, overlay, close);
    });
});