const path = require('path');

module.exports = function (request, response) {

    let str = 'abcd';
    let check = {
        letters: false,
        numbers: true,
        agreement: true,
        type: true

    };

    for (let i=0; i<request.body.letters.length; i++) {
        check.letters = true;
        if (!~str.indexOf(request.body.letters[i])) {
            check.letters = false;
            break
        }
    }

    if (isNaN(request.body.numbers) || !request.body.numbers) {
        check.numbers = false;
    }

    if (!request.body.agreement) {
        check.agreement = false;
    }

    if (!request.body.type) {
        check.type = false;
    }

    if (check.letters && check.numbers && check.agreement && check.type) {
        response.status(200).send(check);
    } else {
        response.status(500).send(check);
    }


};