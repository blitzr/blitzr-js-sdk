'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = require('./player.js');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Blitzr provide methods to call API Blitzr
 * @see http://api.blitzr.com/doc
 */

var Blitzr = function () {
    /**
     * Create instance
     * @param {string} keyAPI API Key is required to use all methods
     */

    function Blitzr(keyAPI) {
        _classCallCheck(this, Blitzr);

        if (!keyAPI) {
            throw new Error('API Key is required for use Blitzr');
        }
        var self = this;
        this._key = keyAPI;

        /**
         * Provide search methods - All methods return a promise
         * @type {object}
         * @property {function} all - Get search results
         * @property {function} artist - Get artist search results
         * @property {function} label - Get label search results
         * @property {function} release - Get release search results
         * @property {function} track - Get track search results
         * @example
         * const result = []
         * blitzr.search.artist({ query: 'myQuery' }).then(res => { result = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.search = {
            all: function all(data) {
                return self._sendToAPI('/search/', data);
            },
            artist: function artist(data) {
                return self._sendToAPI('/search/artist/', data);
            },
            label: function label(data) {
                return self._sendToAPI('/search/label/', data);
            },
            release: function release(data) {
                return self._sendToAPI('/search/release/', data);
            },
            track: function track(data) {
                return self._sendToAPI('/search/track/', data);
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
            artist: function artist(data) {
                return self._sendToAPI('/radio/artist/', data);
            },
            artistSimilar: function artistSimilar(data) {
                return self._sendToAPI('/radio/artist/similar/', data);
            },
            event: function event(data) {
                return self._sendToAPI('/radio/event/', data);
            },
            label: function label(data) {
                return self._sendToAPI('/radio/label/', data);
            },
            tag: function tag(data) {
                return self._sendToAPI('/radio/tag/', data);
            }
        };

        /**
         * Provide track methods - All methods return a promise
         * @type {object}
         * @property {function} get - Get track
         * @property {function} sources - Get track sources
         * @example
         * const track = {}
         * blitzr.track.get({ uuid: 'uuid' }).then(res => { track = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.track = {
            get: function get(data) {
                return self._sendToAPI('/track/', data);
            },
            sources: function sources(data) {
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
            get: function get(data) {
                return self._sendToAPI('/artist/', data);
            },
            aliases: function aliases(data) {
                return self._sendToAPI('/artist/aliases/', data);
            },
            bands: function bands(data) {
                return self._sendToAPI('/artist/bands/', data);
            },
            biography: function biography(data) {
                return self._sendToAPI('/artist/biography/', data);
            },
            events: function events(data) {
                return self._sendToAPI('/artist/events/', data);
            },
            harmonia: function harmonia(data) {
                return self._sendToAPI('/artist/harmonia/', data);
            },
            members: function members(data) {
                return self._sendToAPI('/artist/members/', data);
            },
            related: function related(data) {
                return self._sendToAPI('/artist/related/', data);
            },
            releases: function releases(data) {
                return self._sendToAPI('/artist/releases/', data);
            },
            similar: function similar(data) {
                return self._sendToAPI('/artist/similar/', data);
            },
            summary: function summary(data) {
                return self._sendToAPI('/artist/summary/', data);
            },
            websites: function websites(data) {
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
            artist: function artist(data) {
                return self._sendToAPI('/harmonia/artist/', data);
            },
            label: function label(data) {
                return self._sendToAPI('/harmonia/label/', data);
            },
            release: function release(data) {
                return self._sendToAPI('/harmonia/release/', data);
            },
            searchBySource: function searchBySource(data) {
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
            get: function get(data) {
                return self._sendToAPI('/label/', data);
            },
            artists: function artists(data) {
                return self._sendToAPI('/label/artists/', data);
            },
            biography: function biography(data) {
                return self._sendToAPI('/label/biography/', data);
            },
            harmonia: function harmonia(data) {
                return self._sendToAPI('/label/harmonia/', data);
            },
            releases: function releases(data) {
                return self._sendToAPI('/label/releases/', data);
            },
            similar: function similar(data) {
                return self._sendToAPI('/label/similar/', data);
            },
            websites: function websites(data) {
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
        this.releases = {
            get: function get(data) {
                return self._sendToAPI('/releases/', data);
            },
            sources: function sources(data) {
                return self._sendToAPI('/releases/sources/', data);
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
            artist: function artist(product, data) {
                return self._sendToAPI('/buy/artist/' + product + '/', data);
            },
            label: function label(product, data) {
                return self._sendToAPI('/buy/label/' + product + '/', data);
            },
            release: function release(product, data) {
                return self._sendToAPI('/buy/release/' + product + '/', data);
            },
            track: function track(data) {
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
            get: function get(data) {
                return self._sendToAPI('/tag/', data);
            },
            artists: function artists(data) {
                return self._sendToAPI('/tag/artists/', data);
            },
            releases: function releases(data) {
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
            get: function get(data) {
                return self._sendToAPI('/event/', data);
            }
        };

        /**
         * Provide events method - return a promise
         * @type {object}
         * @property {function} get - Get events
         * @example
         * const events = []
         * blitzr.events.get({ slug: 'slug' }).then(res => { events = res })
         * @see http://blitzr.github.io/blitzr-js-sdk/index.html#usage
         */
        this.events = {
            get: function get(data) {
                return self._sendToAPI('/events/', data);
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


    _createClass(Blitzr, [{
        key: '_isEmpty',
        value: function _isEmpty(object) {
            switch (typeof object === 'undefined' ? 'undefined' : _typeof(object)) {
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
    }, {
        key: '_sendToAPI',
        value: function _sendToAPI(path, data) {
            var location = 'https://api.blitzr.com';
            var query = this._toQueryString(data);
            var key = '?key=' + this._key + '&';
            var url = location + path + key + query;

            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('GET', url, true);
                req.setRequestHeader('Content-Type', 'application/json');
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status === 200) {
                            resolve(JSON.parse(req.responseText));
                        } else {
                            reject(JSON.parse(req.responseText));
                        }
                    }
                };
                req.send(null);
            });
        }
    }, {
        key: '_toQueryString',
        value: function _toQueryString(object, base) {
            var _this = this;

            var queryString = [];

            Object.keys(object).forEach(function (key) {
                var result = void 0;
                var value = object[key];

                if (base) {
                    key = base + '[' + key + ']';
                }
                switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
                    case 'object':
                        result = _this._toQueryString(value, key);
                        break;
                    case 'array':
                        var qs = {};
                        value.forEach(function (val, i) {
                            qs[i] = val;
                        });
                        result = _this._toQueryString(qs, key);
                        break;
                    default:
                        result = key + '=' + encodeURIComponent(value);
                }

                if (!_this._isEmpty(value)) {
                    queryString.push(result);
                }
            });
            return queryString.join('&');
        }

        /**
         * Set a new API Key
         */

    }, {
        key: 'key',
        set: function set(keyAPI) {
            this._key = keyAPI;
        }

        /**
         * Get the current API Key
         */
        ,
        get: function get() {
            return this._key;
        }
    }], [{
        key: 'player',
        value: function player(target) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return new _player2.default(target, options);
        }
    }]);

    return Blitzr;
}();

exports.default = Blitzr;