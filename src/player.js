const defaultOptions = {
    width: 200,
    height: 200,
    initVolume: 100,
    onPlay() {},
    onPlaying() {},
    onPause() {},
    onLoad() {},
    onSeekTo() {},
    onSetVolume() {},
    onStop() {},
    onEnd() {}
};

/**
 * Player provides methods to control playlist
 */
export default class Player {

    /**
     * Create an instance Player
     * @param {string} - id of DOM element
     * @param {object} [options=defaultOptions] - options
     * @see http://blitzr.github.io/blitzr-js-sdk/index.html#player
     */
    constructor(target, options = {}) {
        // Select DOM element
        this._el = document.getElementById(target);
        if (!this._el) {
            throw new Error('target not found');
        }

        // Init parameters
        this._id = new Date().getTime();
        this._src = '';
        this._options = Object.assign({}, defaultOptions, options);
        this._el.innerHTML = `<iframe src="${this._src}" width="${this._options.width}" height="${this._options.height}" scrolling="no" frameborder="no"></iframe>`;
        this._volume = this._options.initVolume;
        this._loaded = false;
        this._isPaused = true;
        this._iframe = this._el.firstElementChild;

        // Subscrib to iframe
        this._iframe.onload = () => {
            if (this._iframe.getAttribute('src')) {
                this._postToIframe({
                    command: 'blitzr_connect',
                    extra: this._id
                });
                this._loaded = true;
            } else {
                this._loaded = false;
            }
        };

        // Lisen events
        window.addEventListener('message', e => {
            try {
                const data = JSON.parse(e.data);
                if (data.identifier === this._id) {
                    switch (data.status) {
                        case 'blitzr_playing': {
                            if (this._isPaused) {
                                this._isPaused = false;
                                this._options.onPlay.call(this, JSON.parse(e.data));
                                this._setVolume(this._volume);
                                this._duration = data.duration;
                            }
                            this._currentTime = data.time;
                            this._options.onPlaying.call(this, JSON.parse(e.data));
                            break;
                        }
                        case 'blitzr_paused': {
                            this._options.onPause.call(this, JSON.parse(e.data));
                            this._isPaused = true;
                            break;
                        }
                        case 'blitzr_ended': {
                            this._isPaused = true;
                            this._options.onEnd.call(this, JSON.parse(e.data));
                            break;
                        }
                    }
                }
            } catch (err) {
                return false;
            }
        });
    }

    _postToIframe(message) {
        this._iframe.contentWindow.postMessage(JSON.stringify(message), '*');
    }

    _setVolume(volume) {
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
    load(track) {
        this._isPaused = true;
        this._src = `https://player.blitzr.com/${track}?t=${this._id}`;
        this._iframe.setAttribute('src', this._src);
        this._options.onLoad.call(this);
    }

    /**
     * pause the current track
     */
    pause() {
        this._postToIframe({
            command: 'blitzr_pause'
        });
    }

    /**
     * play the current track
     */
    play() {
        this._postToIframe({
            command: 'blitzr_play'
        });
    }

    /**
     * play the current track at the given time
     * @param {number} time - in second
     */
    seekTo(time) {
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
    stop() {
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
    set volume(volume) {
        this._setVolume(volume);
        this._options.onSetVolume.call(this, volume);
    }

    /**
     * get volume
     * @return {number} in percentage
     */
    get volume() {
        return this._volume;
    }

    /**
     * get volume
     * @return {float} in seconds
     */
    get currentTime() {
        return this._currentTime || 0;
    }

    /**
     * get duration
     * @return {float} in seconds
     */
    get duration() {
        return this._duration || 0;
    }
}
