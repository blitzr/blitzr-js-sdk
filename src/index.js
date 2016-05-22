const Player = require('./player.js');

class Blitzr {
    constructor(keyAPI) {
        if (!keyAPI) {
            throw new Error('API Key is required for use Blitzr');
        }
        const self = this;
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

        this.artist = {
            get(data) {
                return self._sendToAPI('/artist/', data);
            },
            aliases(data) {
                return self._sendToAPI('/artist/aliases/', data);
            },
            bands(data) {
                return self._sendToAPI('/artist/bands/', data);
            },
            biography(data) {
                return self._sendToAPI('/artist/biography/', data);
            },
            events(data) {
                return self._sendToAPI('/artist/events/', data);
            },
            harmonia(data) {
                return self._sendToAPI('/artist/harmonia/', data);
            },
            members(data) {
                return self._sendToAPI('/artist/members/', data);
            },
            related(data) {
                return self._sendToAPI('/artist/related/', data);
            },
            releases(data) {
                return self._sendToAPI('/artist/releases/', data);
            },
            similar(data) {
                return self._sendToAPI('/artist/similar/', data);
            },
            summary(data) {
                return self._sendToAPI('/artist/summary/', data);
            },
            websites(data) {
                return self._sendToAPI('/artist/websites/', data);
            }
        };

    }

    static player(target, options) {
        return new Player(target, options);
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

    set key(keyAPI) {
        return this._key = keyAPI;
    }

    get key() {
        return this._key;
    }

    event(data) {
        return this._sendToAPI('/event/', data);
    }

    events(data) {
        return this._sendToAPI('/events/', data);
    }
}

module.exports = Blitzr;
