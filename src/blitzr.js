import Player from './player.js';
import XMLHttpRequest from './xhr.js';

/**
 * Blitzr provide methods to call API Blitzr
 * @see http://api.blitzr.com/doc
 */
export default class Blitzr {

    /**
     * Create instance
     * @param {string} keyAPI API Key is required to use all methods
     */
    constructor(keyAPI) {
        if (!keyAPI) {
            throw new Error('API Key is required to use Blitzr');
        }
        const self = this;
        this._key = keyAPI;
        this._location = 'https://api.blitzr.com';

        /**
         * Provide search methods - All methods return a promise
         * @type {object}
         * @property {function} all - Get search results
         * @property {function} artist - Get artist search results
         * @property {function} label - Get label search results
         * @property {function} release - Get release search results
         * @property {function} track - Get track search results
         * @property {function} event - Get event search results
         * @example
         * const result = []
         * blitzr.search.artist({ query: 'myQuery' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.search = {
            all(data) {
                return self._sendToAPI('/search/', data);
            },
            artist(data) {
                return self._sendToAPI('/search/artist/', data);
            },
            label(data) {
                return self._sendToAPI('/search/label/', data);
            },
            release(data) {
                return self._sendToAPI('/search/release/', data);
            },
            track(data) {
                return self._sendToAPI('/search/track/', data);
            },
            event(data) {
                return self._sendToAPI('/search/event/', data);
            }
        };

        /**
         * Provide radio methods - All methods return a promise
         * @type {object}
         * @property {function} artist - Get artist radio
         * @property {function} artistSimilar - Get similar artists radio
         * @property {function} event - Get event radio
         * @property {function} label - Get label radio
         * @property {function} tag - Get track tag radio
         * @example
         * const playlist = []
         * blitzr.radio.artist({ uuid: 'uuid' }).then(res => { playlist = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
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
            }
        };

        /**
         * Provides track methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get track
         * @property {function} sources - Get track sources
         * @example
         * const track = {}
         * blitzr.track.get({ uuid: 'uuid' }).then(res => { track = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.track = {
            get(data) {
                return self._sendToAPI('/track/', data);
            },
            sources(data) {
                return self._sendToAPI('/track/sources/', data);
            }
        };

        /**
         * Provide artist methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get artist
         * @property {function} aliases - Get artist aliases
         * @property {function} bands - Get bands for artist
         * @property {function} biography - Get artist biography
         * @property {function} events - Get artist events
         * @property {function} harmonia - Get harmonia
         * @property {function} members - Get artist members
         * @property {function} related - Get related artist
         * @property {function} releases - Get artist releases
         * @property {function} similar - Get similar artists
         * @property {function} summary - Get artist generated summary
         * @property {function} websites - Get artist websites
         * @example
         * const result = []
         * blitzr.artist.get({ uuid: 'uuid' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
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

        /**
         * Provide harmonia methods - All methods return a promise
         * @type {object}
         * @property {function} artist - Get artist by service id
         * @property {function} label - Get label by service id
         * @property {function} release - Get release by service id
         * @property {function} searchBySource - Get tracks for source
         * @example
         * const result = []
         * blitzr.harmonia.artist({ service_name: 'spotify', service_id: 'spotify_id' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.harmonia = {
            artist(data) {
                return self._sendToAPI('/harmonia/artist/', data);
            },
            label(data) {
                return self._sendToAPI('/harmonia/label/', data);
            },
            release(data) {
                return self._sendToAPI('/harmonia/release/', data);
            },
            searchBySource(data) {
                return self._sendToAPI('/harmonia/searchbysource/', data);
            }
        };

        /**
         * Provide label methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get label
         * @property {function} artist - Get label artist
         * @property {function} biography - Get label biography
         * @property {function} harmonia - Get harmonia
         * @property {function} releases - Get label releases
         * @property {function} similar - Get similar labels
         * @property {function} websites - Get artist websites
         * @example
         * const result = []
         * blitzr.label.get({ uuid: 'uuid' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.label = {
            get(data) {
                return self._sendToAPI('/label/', data);
            },
            artists(data) {
                return self._sendToAPI('/label/artists/', data);
            },
            biography(data) {
                return self._sendToAPI('/label/biography/', data);
            },
            harmonia(data) {
                return self._sendToAPI('/label/harmonia/', data);
            },
            releases(data) {
                return self._sendToAPI('/label/releases/', data);
            },
            similar(data) {
                return self._sendToAPI('/label/similar/', data);
            },
            websites(data) {
                return self._sendToAPI('/label/websites', data);
            }
        };

        /**
         * Provide releases methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get release
         * @property {function} sources - Get release sources
         * @example
         * const result = []
         * blitzr.releases.get({ uuid: 'uuid' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.release = {
            get(data) {
                return self._sendToAPI('/release/', data);
            },
            sources(data) {
                return self._sendToAPI('/release/sources/', data);
            }
        };

        /**
         * Provide shop methods - All methods return a promise
         * @type {object}
         * @property {function} artist - Get artist items
         * @property {function} label - Get label items
         * @property {function} release - Get release items
         * @property {function} track - Get track items
         * @example
         * const result = []
         * blitzr.shop.artist('mp3', { uuid: 'uuid' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.shop = {
            artist(product, data) {
                return self._sendToAPI(`/buy/artist/${product}/`, data);
            },
            label(product, data) {
                return self._sendToAPI(`/buy/label/${product}/`, data);
            },
            release(product, data) {
                return self._sendToAPI(`/buy/release/${product}/`, data);
            },
            track(data) {
                return self._sendToAPI('/buy/track/', data);
            }
        };

        /**
         * Provide tag methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get tag
         * @property {function} artists - Get tag artists
         * @property {function} release - Get tag releases
         * @example
         * const tag = ''
         * blitzr.tag.get({ slug: 'slug' }).then(res => { tag = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.tag = {
            get(data) {
                return self._sendToAPI('/tag/', data);
            },
            artists(data) {
                return self._sendToAPI('/tag/artists/', data);
            },
            releases(data) {
                return self._sendToAPI('/tag/releases/', data);
            }
        };

        /**
         * Provide event method - return a promise
         * @type {object}
         * @property {function} get - Get event details
         * @example
         * const event = {}
         * blitzr.event.get({ slug: 'slug' }).then(res => { event = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.event = {
            get(data) {
                return self._sendToAPI('/event/', data);
            }
        };
    }

    /**
     * Create an instance of Player
     * @param {string} target - id of DOM element
     * @param {object} [options={}] - More informations
     * @return {Player}
     * @see http://blitzr.github.io/blitzr-js-sdk/index.html#player
     */
    static player(target, options = {}) {
        return new Player(target, options);
    }

    static _isEmpty(object) {
        switch (typeof object) {
            case 'string':
            case 'array': {
                return !object.length;
            }
            case 'object': {
                for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                        return false;
                    }
                }

                return true;
            }
            default: {
                return false;
            }
        }
    }

    _sendToAPI(path, data, location = this._location) {
        const query = Blitzr._toQueryString(data);
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
                        reject(req.responseText);
                    }
                }
            };
            req.send(null);
        });
    }

    static _toQueryString(object, base) {
        const queryString = [];

        Object.keys(object).forEach(key => {
            const value = object[key];
            let result = '';

            if (base) {
                key = `${base}[${key}]`;
            }
            switch (typeof value) {
                case 'object': {
                    result = Blitzr._toQueryString(value, key);
                    break;
                }
                case 'array': {
                    const qs = {};
                    value.forEach((val, i) => {
                        qs[i] = val;
                    });
                    result = Blitzr._toQueryString(qs, key);
                    break;
                }
                default: {
                    result = `${key}=${encodeURIComponent(value)}`;
                }
            }

            if (!Blitzr._isEmpty(value)) {
                queryString.push(result);
            }
        });

        return queryString.join('&');
    }

    /**
     * Set a new API Key
     */
    set key(keyAPI) {
        this._key = keyAPI;
    }

    /**
     * Get the current API Key
     */
    get key() {
        return this._key;
    }
}
