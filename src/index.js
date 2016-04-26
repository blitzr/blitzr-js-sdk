const Player = require('./player.js');

class Blitzr {
    constructor(keyAPI) {
        this.Player = Player;
        this._key = keyAPI;

        this.search = {
            artist(query = '', filters = {}, autocomplete = false, limit = 10, start = 0, extras = false) {
                const data = {
                    query,
                    filters,
                    autocomplete,
                    limit,
                    start,
                    extras
                };
                this._sendToAPI('/search/artist', data);
            }
        };
    }

    _sendToAPI(path, data) {
        const location = 'https://api.blitzr.com';
        const query = this._toStringQuery(data);
        const url = location+path+query;
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if(req.status == 200)
                    console.log(req.responseText);
                else
                    console.log('Error on call API');
            }
        };
        req.send(null);
    }

    _toStringQuery(obj) {
        let str = '?';
        for (let key in obj) {
            str += `${key}=`;
            switch(typeof obj[key]) {
            case 'string':
                str += obj[key].trim().replace(/ /g, '+');
                break;
            case 'boolean':
            case 'number':
                str += obj[key].toString();
                break;
            }
            str += '&';
        }
        return str.slice(0, -1);
    }
}

module.exports = new Blitzr();
