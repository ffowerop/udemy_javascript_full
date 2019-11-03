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
            console.log('bbb' + Math.random());
            popupWindow.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.classList.add('more-splash');
            //let self = this;
            let form = document.querySelector('form.main-form');
            let popup = document.querySelector('.popup-form');
            let sendingStatus = document.createElement('div');
            form.appendChild(sendingStatus);
            let succesMessage = document.createElement('div');
            popup.appendChild(succesMessage);    
            
            let listner = function (event) {
                event.preventDefault();

                
                 
                let status = {
                    load: 'loading',
                    done: '<h1>Ваши данные успешно отправлены</h1>',
                    error: 'something goes wrong',
                };

                new Promise(function(resolve, reject) {

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                   
                    request.setRequestHeader('Content-Type', 'application/json');
                    let formData = new FormData(form);
                    let formObj = {};
                    
                    formData.forEach((key, value) => formObj[key] = value);
                    console.log('ccc');
                    request.addEventListener('load', function() {
                        if (request.readyState === 4 && request.status === 200) {
                            resolve();                            
                        } else {                                
                            reject();
                        }
                    });
                    request.send(JSON.stringify(formObj));

                })                
                .then(() => {
                    form.style.display = 'none';
                    succesMessage.innerHTML = status.done;
                    console.log('aaa' + Math.random());
                })
                .catch(() => sendingStatus.textContent = status.error)
                .finally(() => document.querySelector('.popup-form__input').value = '');
            };

            form.addEventListener('submit', listner);

            closeButton.addEventListener('click',function buttonListner() {
                
                this.removeEventListener('click', buttonListner);
                form.removeEventListener('submit', listner);
                console.log(sendingStatus.textContent);
                sendingStatus.textContent = '';
                console.log(sendingStatus.textContent);
                console.log(succesMessage.innerHTML);
                succesMessage.innerHTML = '';
                console.log(succesMessage.innerHTML);
                form.style.display = 'block';
                popupWindow.style.display = 'none';
                document.body.style.overflow = '';
                openButton.classList.remove('more-splash');                             
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


    /// PHOTO-SLIDER
    function slider() {
        let active = 0;
        let slides = document.querySelectorAll('.slider-item');
        let dots = document.querySelectorAll('.dot');

        let selectDot = function(n=0) {
            dots.forEach(d => d.classList.remove('dot-active'));
            dots[n].classList.add('dot-active');
        };

        let selectSlide = function(n=2) {
            slides.forEach(s => s.style.display = 'none');
            slides[n].style.display = 'block';
            active = n;
            selectDot(n);            
        };
        selectSlide();

        let sliderDot = document.querySelector('.slider-dots');
        sliderDot.addEventListener('click', function(e) {
            dots.forEach((v, i) => {
                return (e.target === v) ? selectSlide(i) : 1;
            });
        });

        let rightArrow = document.querySelector('.next');
        rightArrow.addEventListener('click', function(e) {
            selectSlide((active + 1) % slides.length);
        });
        let leftArrow = document.querySelector('.prev');
        leftArrow.addEventListener('click', function(e) {
            selectSlide((active + slides.length - 1) % slides.length);
        });
    }
    slider();

    /// CALCULATOR
    function calculator() {
        const PRICE = 4000;
        let total = document.getElementById('total');
        total.textContent = '';
        let select = document.getElementById('select');
        let inputs = document.querySelectorAll('.counter-block-input');
        const reCount = function(val1, val2, price, place) {
            if (val1 && val2) {
                total.textContent = val1 * val2 * PRICE * select.options[select.selectedIndex].value;
            } else {
                total.textContent = 0;
            }
        };
        //select.addEventListener('change', () => {
        inputs.forEach((input, i) => {
            input.addEventListener('input', () => {
                reCount(inputs[i].value, inputs[(i+1)%2].value);
            });
        });
        select.addEventListener('change', () => {
            reCount(inputs[0].value, inputs[1].value);
        });
    }
    calculator();
});