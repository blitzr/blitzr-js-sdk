(function() {
    'use strict';

    class BlitzrPlayer {
        constructor(target, options = {}) {
            this._el = document.getElementById(target)
            if (!this._el) {
                throw new Error('target not found')
            }

            this._src = ''
            this._el.innerHTML = `<iframe src="${this._src}" scrolling="no" frameborder="no"></iframe>`

            this._iframe = this._el.firstElementChild
            this._iframe.onload = (event) => {
                this._postToIframe('blitzr_connect')
            }
        }

        _postToIframe(message) {
            this._iframe.contentWindow.postMessage(message, this._src)
        }

        load(track) {
            this._src = `http://player.blitzr.com/${track}`
            this._iframe.setAttribute('src', this._src)
        }

        play() {
            this._postToIframe('blitzr_play')
        }

        pause() {
            this._postToIframe('blitzr_pause')
        }

        stop() {
            this._iframe.setAttribute('src', '')
        }

        seekTo(time) {
            const data = {
                command: 'blitzr_seek',
                extra: time
            }
            this._postToIframe(JSON.stringify(data))
        }

        get currentTime() {
            return this.currentTime
        }

        get duration() {
            return this.duration
        }
    }

    // window.addEventListener('message', function(e) {
    //     try {
    //         var msg = JSON.parse(e.data)
    //         switch (msg.status) {
    //             case 'blitzr_playing':
    //                 break
    //             case 'blitzr_paused':
    //                 break
    //             case 'blitzr_ended':
    //                 break
    //             case 'blitzr_error':
    //                 break
    //             case 'blitzr_no_sources':
    //                 break
    //             default:
    //                 break
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })

    class Blitzr {
        constructor() {
        }
    }

    window.BlitzrPlayer = BlitzrPlayer
    window.Blitzr = new Blitzr()
}())
