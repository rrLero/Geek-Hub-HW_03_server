(function () {

    const form = document.forms[0];

    form.addEventListener('submit', handler);

    function handler(el) {

        el.preventDefault();

        const xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/check-form', true);
        xhr.responseType = 'json';

        const json = JSON.stringify({
            numbers: form.elements.numbers.value,
            letters: form.elements.letters.value,
            agreement: form.elements.agreement.checked,
            type: !!form.type.value,

        });
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send(json);

        xhr.onreadystatechange = function() { // (3)

            if (xhr.readyState != 4) return;

            Object.keys(xhr.response).forEach(el => {
                document.getElementById(el).hidden = xhr.response[el]
            });

            if (xhr.status === 200) {
                Object.keys(xhr.response).forEach(el => {
                    document.getElementById(el).hidden = xhr.response[el];
                    document.getElementById(el).previousElementSibling.className = '';
                });
                form.reset()
            } else {
                Object.keys(xhr.response).forEach(el => {
                    document.getElementById(el).hidden = xhr.response[el];
                    document.getElementById(el).previousElementSibling.className = '';
                    if (!xhr.response[el]) {
                        document.getElementById(el).previousElementSibling.className = 'back';
                    }
                });
            }
        }
    }
})();