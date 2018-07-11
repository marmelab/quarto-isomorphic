const request = require('request');

const config = { apiUrl: 'localhost/gameapi' };

module.exports = {
    getGame: (idGame, callBack, args) => {
        const url = `http://${config.apiUrl}/${idGame}`;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                if (!callBack) return body;
                callBack(args, body);
            }
        });
    },
};
