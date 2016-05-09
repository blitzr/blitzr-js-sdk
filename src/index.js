const Player = require('./player.js');

class Blitzr {
    constructor(keyAPI) {
        if (!keyAPI) {
            throw new Error('API Key is required for use Blitzr');
        }
        const self = this;
        this.Player = Player;
        this._key = keyAPI;

        this.search = {
            all(data) {
                return self._sendToAPI('/search/', data);
            },
            artist(data) {
                return self._sendToAPI('/search/artist/', data);
            },
            city(data) {
                return self._sendToAPI('/search/city/', data);
            },
            country(data) {
                return self._sendToAPI('/search/country/', data);
            },
            label(data) {
                return self._sendToAPI('/search/label/', data);
            },
            release(data) {
                return self._sendToAPI('/search/release/', data);
            },
            track(data) {
                return self._sendToAPI('/search/track/', data);
            }
        };

        this.radio = {
            artist(data) {
                return self._sendToAPI('/radio/artist/', data);
            },
            artistSimilar(data) {
                return self._sendToAPI('/radio/artist/similar/', data);
            },
            event(data) {
                return self._sendToAPI('/radio/event/', data);
            },
            label(data) {
                return self._sendToAPI('/radio/label/', data);
            },
            tag(data) {
                return self._sendToAPI('/radio/tag/', data);
            },
            venue(data) {
                return self._sendToAPI('/radio/venue/', data);
            }
        };

        this.track = {
            get(data) {
                return self._sendToAPI('/track/', data);
            },
            sources(data) {
                return self._sendToAPI('/track/sources/', data);
            }
        };
    }

    _isEmpty(object) {
        switch (typeof object) {
        case 'string':
        case 'array':
            return !object.length;
        case 'object':
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
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
            req.onreadystatechange = function() {
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
            const value = object[key];

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
}

module.exports = Blitzr;
