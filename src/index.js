const Player = require('./player.js');

class Blitzr {
    constructor(keyAPI) {
        if(!keyAPI) {
            throw new Error('API Key is required for use Blitzr');
        }
        const self = this;
        this.Player = Player;
        this._key = keyAPI;

        this.search = {
            default: {
                limit: 10,
                start: 0,
                autocomplete: false,
                extras: false
            },
            all(query = '', type = 'artist, label, release, track', autocomplete = this.default.autocomplete, limit = this.default.limit, start = this.default.start, extras = this.default.extras) {
                const data = { query, type, autocomplete, limit, start, extras };
                return self._sendToAPI('/search/', data);
            },
            artist(query = '', filters = {}, autocomplete = this.default.autocomplete, limit = this.default.limit, start = this.default.start, extras = this.default.extras) {
                const data = { query, filters, autocomplete, limit, start, extras };
                return self._sendToAPI('/search/artist/', data);
            },
            city(query = '', autocomplete = this.default.autocomplete, latitude = false, longitude = false, limit = this.default.limit, start = this.default.start, extras = this.default.extras) {
                const data = { query, autocomplete, limit, start, extras };
                if (latitude) {
                    data.latitude = latitude;
                }
                if (longitude) {
                    data.longitude = longitude;
                }
                return self._sendToAPI('/search/city/', data);
            }
            // country(query = '', filters = {}, autocomplete = this.default.autocomplete, limit = this.default.limit, start = this.default.start, extras = this.default.extras) {
            //     const data = { query, filters, autocomplete, limit, start, extras }
            //     return self._sendToAPI('/search/city/', data);
            // }
        };
    }

    _isEmpty(object) {
        switch (typeof object) {
        case 'string':
        case 'array':
            return !object.length;
        case 'object':
            for(var key in object) {
                if(object.hasOwnProperty(key)){
                    return false;
                }
            }
            return true;
        default:
            return false;
        }
    }

    _sendToAPI(path, data) {
        const location = 'https://api.blitzr.com';
        const query = this._toQueryString(data);
        const key = '?key=' + this._key + '&';
        const url = location + path + key + query;

        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Content-Type', 'application/json');
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(JSON.parse(req.responseText));
                    } else {
                        reject('Error on call API');
                    }
                }
            };
            req.send(null);
        });
    }

    _toQueryString(object, base) {
        const queryString = [];

        Object.keys(object).forEach((key) => {
            let result;
            let value;

            value =  object[key];

            if (base) {
                key = `${base}[${key}]`;
            }
            switch (typeof value) {
            case 'object':
                result = this._toQueryString(value, key);
                break;
            case 'array':
                var qs = {};
                value.forEach((val, i) => {
                    qs[i] = val;
                });
                result = this._toQueryString(qs, key);
                break;
            default:
                result = `${key}=${encodeURIComponent(value)}`;
            }

            if (!this._isEmpty(value)) {
                queryString.push(result);
            }
        });
        return queryString.join('&');
    }

    search() {

    }
}

module.exports = Blitzr;
