(function() {
    'use strict';

    let inputRub = document.getElementById('rub'),
        inputUsd = document.getElementById('usd');

    inputRub.addEventListener('input', () => {

        new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            request.addEventListener('load', function() {
                if (1) {
                    resolve(request);
                } else {
                    reject();
                }
            });
            
        })
        .then(request => {
            inputUsd.value = inputRub.value / JSON.parse(request.response).usd;
        })
        .catch(() => {inputUsd.value = "Что-то пошло не так!";});
    });
})();