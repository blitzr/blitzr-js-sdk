'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
    width: 200,
    height: 200,
    initVolume: 100,
    onPlay: function onPlay() {},
    onPlaying: function onPlaying() {},
    onPause: function onPause() {},
    onLoad: function onLoad() {},
    onSeekTo: function onSeekTo() {},
    onSetVolume: function onSetVolume() {},
    onStop: function onStop() {},
    onEnd: function onEnd() {}
};

/**
 * Player provide methods to control playlist
 */

var Player = function () {
    /**
     * Create an instance Player
     * @param {string} - id of DOM element
     * @param {object} [options=defaultOptions] - options
     * @see http://blitzr.github.io/blitzr-js-sdk/index.html#player
     */

    function Player(target) {
        var _this = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Player);

        // Select DOM element
        this._el = document.getElementById(target);
        if (!this._el) {
            throw new Error('target not found');
        }

        // Init parameters
        this._id = new Date().getTime();
        this._src = '';
        this._options = Object.assign({}, defaultOptions, options);
        this._el.innerHTML = '<iframe src="' + this._src + '" width="' + this._options.width + '" height="' + this._options.height + '" scrolling="no" frameborder="no"></iframe>';
        this._volume = this._options.initVolume;
        this._loaded = false;
        this._isPaused = true;
        this._iframe = this._el.firstElementChild;

        // Subscrib to iframe
        this._iframe.onload = function () {
            if (_this._iframe.getAttribute('src')) {
                _this._postToIframe({
                    command: 'blitzr_connect',
                    extra: _this._id
                });
                _this._loaded = true;
            } else {
                _this._loaded = false;
            }
        };

        // Lisen events
        window.addEventListener('message', function (e) {
            try {
                var data = JSON.parse(e.data);
                if (data.identifier === _this._id) {
                    switch (data.status) {
                        case 'blitzr_playing':
                            if (_this._isPaused) {
                                _this._isPaused = false;
                                _this._options.onPlay.call(_this, JSON.parse(e.data));
                                _this._setVolume(_this._volume);
                                _this._duration = data.duration;
                            }
                            _this._currentTime = data.time;
                            _this._options.onPlaying.call(_this, JSON.parse(e.data));
                            break;
                        case 'blitzr_paused':
                            _this._options.onPause.call(_this, JSON.parse(e.data));
                            _this._isPaused = true;
                            break;
                        case 'blitzr_ended':
                            _this._isPaused = true;
                            _this._options.onEnd.call(_this, JSON.parse(e.data));
                            break;
                    }
                }
            } catch (err) {
                return false;
            }
        });
    }

    _createClass(Player, [{
        key: '_postToIframe',
        value: function _postToIframe(message) {
            this._iframe.contentWindow.postMessage(JSON.stringify(message), '*');
        }
    }, {
        key: '_setVolume',
        value: function _setVolume(volume) {
            if (volume < 0) {
                volume = 0;
            } else if (volume > 100) {
                volume = 100;
            }
            this._postToIframe({
                command: 'blitzr_volume',
                extra: volume
            });
            this._volume = volume;
        }

        /**
         * Load a track by uuid and play the track
         * @param {string} track - uuid of the track
         */

    }, {
        key: 'load',
        value: function load(track) {
            this._src = 'http://player.blitzr.com/' + track + '?t=' + this._id;
            this._iframe.setAttribute('src', this._src);
            this._options.onLoad.call(this);
        }

        /**
         * pause the current track
         */

    }, {
        key: 'pause',
        value: function pause() {
            this._postToIframe({
                command: 'blitzr_pause'
            });
        }

        /**
         * play the current track
         */

    }, {
        key: 'play',
        value: function play() {
            this._postToIframe({
                command: 'blitzr_play'
            });
        }

        /**
         * play the current track at the given time
         * @param {number} time - in second
         */

    }, {
        key: 'seekTo',
        value: function seekTo(time) {
            if (time < 0) {
                time = 0;
            } else if (time > this._duration) {
                time = this._duration;
            }
            this._postToIframe({
                command: 'blitzr_seek',
                extra: time
            });
            this._options.onSeekTo.call(this, time);
        }

        /**
         * stop the current track
         */

    }, {
        key: 'stop',
        value: function stop() {
            this._currentTime = 0;
            this._duration = 0;
            this._src = '';
            this._iframe.setAttribute('src', '');
            this._options.onStop.call(this);
        }

        /**
         * set volume
         * @param {number} volume - in percentage
         */

    }, {
        key: 'volume',
        set: function set(volume) {
            this._setVolume(volume);
            this._options.onSetVolume.call(this, volume);
        }

        /**
         * get volume
         * @return {number} in percentage
         */
        ,
        get: function get() {
            return this._volume;
        }

        /**
         * get volume
         * @return {float} in seconds
         */

    }, {
        key: 'currentTime',
        get: function get() {
            return this._currentTime || 0;
        }

        /**
         * get duration
         * @return {float} in seconds
         */

    }, {
        key: 'duration',
        get: function get() {
            return this._duration || 0;
        }
    }]);

    return Player;
}();

exports.default = Player;