let menuItems = document.querySelectorAll('.menu-item');
let menu = document.querySelector('.menu');
menu.insertBefore(menuItems[2], menuItems[1]);
let menuItem = menuItems[3].cloneNode(true);
menuItem.textContent = 'Пятый пункт';
menu.appendChild(menuItem);

document.body.style.background = 'url(img/apple_true.jpg) center no-repeat';

document.querySelector('#title').innerHTML = 'Мы продаем только подлинную технику Apple';

document.querySelector('.adv').remove();

document.querySelector('#prompt').innerHTML = "<h1>" + prompt("Как вы относитесь к технике apple?", "Никак") + "</h1>";