(function() {

    class BlitzrPlayer {
        constructor(target, options = {}) {
            this._el = document.getElementById(target)
            if (!this._el) {
                throw new Error('target not found')
            }

            this._id = new Date().getTime()
            this._src = ''
            this._el.innerHTML = `<iframe src="${this._src}" scrolling="no" frameborder="no"></iframe>`

            this._iframe = this._el.firstElementChild
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

            window.addEventListener('message', (e) => {
                try {
                    const data = JSON.parse(e.data)
                    if (data.identifier === this._id) {
                        switch (data.status) {
                            case 'blitzr_playing':
                            this.currentTime = data.time
                            break
                        }
                    }
                } catch(err) {
                    return false
                }

            })
        }

        _postToIframe(message) {
            this._iframe.contentWindow.postMessage(JSON.stringify(message), this._src)
        }

        load(track) {
            this._src = `http://play.blitzrr.net/${track}?t=${this._id}`
            // this._src = `http://player.blitzr.com/${track}?t=${this._id}`
            // this._src = `http://192.168.1.20:9000/${track}?t=${this._id}`
            this._iframe.setAttribute('src', this._src)
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

        stop() {
            this._iframe.setAttribute('src', '')
        }

        seekTo(time) {
            this._postToIframe({
                command: 'blitzr_seek',
                extra: time
            })
        }
    }

    class Blitzr {
        constructor() {
        }
    }

    window.BlitzrPlayer = BlitzrPlayer
    window.Blitzr = new Blitzr()
}())
