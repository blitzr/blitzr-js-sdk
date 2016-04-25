const Player = require('./player.js');

class Blitzr {
    constructor(keyAPI) {
        this.Player = Player;
        this._key = keyAPI;
        this._baseURL = 'https://api.blitzr.com';

        this.search = {
            artist(query = "", filters = {}, autocomplete = false, limit = 10, start = 0, extras = false) {
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

    _sendToAPI(action, data) {
        
        const url = this._baseURL+action+query
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function (e) {
            if (req.readyState == 4) {
                if(req.status == 200)
                    console.log(req.responseText);
                else
                    console.log("Error on call API");
            }
        };
        req.send(null);
    }

    _toStringQuery(obj) {
        let str = '?';
        const variables = [];
        for (let key in obj) {
            switch(typeof obj[key]) {
                case 'string':
                    variables.push(`${key}=${obj[key].trim().replace(/ /g, '+')}`);
                    break;
                case 'boolean':
                    const bool = obj[key] ? 'true' : 'false';
                    variables.push(`${key}=${bool}`);
                    break;
                case 'number':
                    variables.push(`${key}=${obj[key]}`);
                    break;
            }
        }
        variables.forEach(variable => {
            str = str + variable + '&';
        })
        return str.slice(0, -1);
    }
}

module.exports = new Blitzr();
