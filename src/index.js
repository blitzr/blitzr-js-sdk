(function() {
    const defaultOptions = {
        width: 200,
        heigth: 200,
        initVolume: 100,
        onPlay() {},
        onPause() {},
        onLoad() {},
        onSeekTo() {},
        onSetVolume() {},
        onStop() {},
        onEnd() {}
    }

    class BlitzrPlayer {
        constructor(target, options = defaultOptions) {
            // Select DOM element
            this._el = document.getElementById(target)
            if (!this._el) {
                throw new Error('target not found')
            }

            // Init parameters
            this._id = new Date().getTime()
            this._src = ''
            this._options = Object.assign({}, defaultOptions, options)
            this._el.innerHTML = `<iframe src="${this._src}" width="${this._options.width}" height="${this._options.height}" scrolling="no" frameborder="no"></iframe>`
            this.volume = options.initVolume
            this._loaded = false
            this._isPaused = true
            this._iframe = this._el.firstElementChild

            // Subscrib to iframe
            this._iframe.onload = (event) => {
                if (this._iframe.getAttribute('src')) {
                    this._postToIframe({
                        command: 'blitzr_connect',
                        extra: this._id
                    })
                    this._loaded = true
                } else {
                    this._loaded = false
                }
            }

            // Lisent events
            window.addEventListener('message', (e) => {
                try {
                    const data = JSON.parse(e.data)
                    if (data.identifier === this._id) {
                        switch (data.status) {
                            case 'blitzr_playing':
                                if (this._isPaused) {
                                    this._isPaused = false
                                    this._options.onPlay()
                                    this._setVolume(this.volume)
                                }
                                this.currentTime = data.time
                                this.duration = data.duration
                                break
                            case 'blitzr_paused':
                                this._options.onPause()
                                this._isPaused = true
                                break
                            case 'blitzr_ended':
                                this._options.onEnd()
                                break
                        }
                    }
                } catch(err) {
                    return false
                }
            })
        }

        _postToIframe(message) {
            this._iframe.contentWindow.postMessage(JSON.stringify(message), '*')
        }

        load(track) {
            this._src = `http://player.blitzr.com/${track}?t=${this._id}`
            this._iframe.setAttribute('src', this._src)
            this._options.onLoad(this)
        }

        play() {
            this._postToIframe({
                command : 'blitzr_play'
            })
        }

        pause() {
            this._postToIframe({
                command : 'blitzr_pause'
            })
        }

        setVolume(volume) {
            this._setVolume(volume)
            this._options.onSetVolume(volume, this)
        }

        _setVolume(volume) {
            if (volume < 0) {
                volume = 0
            } else if (volume > 100) {
                volume = 100
            }
            this._postToIframe({
                command: 'blitzr_volume',
                extra: volume
            })
            this.volume = volume
        }

        stop() {
            this._iframe.setAttribute('src', '')
            this._options.onStop(this)
        }

        seekTo(time) {
            this._postToIframe({
                command: 'blitzr_seek',
                extra: time
            })
            this._options.onSeekTo(time, this)
        }
    }

    class Blitzr {
        constructor() {
        }
    }

    window.BlitzrPlayer = BlitzrPlayer
    window.Blitzr = new Blitzr()
}())
