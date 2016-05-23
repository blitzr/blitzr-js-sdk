const assert = require('assert');
const sinon = require('sinon');
const Blitzr = require('../blitzr.js');
const jsdom = require('mocha-jsdom');
var player;

describe('Player', function() {

    jsdom();
    before(function() {
        document.body.innerHTML = '<div id="player"></div><div id="otherPlayer"></div>';
        player = Blitzr.player('player');
        sinon.stub(player, '_postToIframe').returns(true);
    });

    after(function() {
        player._postToIframe.restore();
    });

    describe('#constructor', function() {
        it('should create instance of Player', function() {
            assert.equal(player._el.id, 'player');
            assert.equal(player._el.firstElementChild.nodeName, 'IFRAME');
            assert.equal(player._iframe.width, '200');
            assert.equal(player._iframe.height, '200');
            assert.equal(player._volume, 100);
        });

        it('should init custom options (volume, width, height)', function() {
            const otherPlayer = Blitzr.player('otherPlayer', {
                initVolume: 50,
                width: 300,
                height: 180
            });
            assert.equal(otherPlayer._iframe.width, '300');
            assert.equal(otherPlayer._iframe.height, '180');
            assert.equal(otherPlayer._volume, 50);
        });
    });

    describe('Volume', function() {
        describe('#_setVolume', function() {
            it('should set volume to 30', function() {
                player._setVolume(30);
                assert.equal(player._volume, 30);
                assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_volume', extra: 30 }));
            });

            it('should set volume to 0', function() {
                player._setVolume(-10);
                assert.equal(player._volume, 0);
                assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_volume', extra: 0 }));
            });

            it('should set volume to 100', function() {
                player._setVolume(200);
                assert.equal(player._volume, 100);
                assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_volume', extra: 100 }));
            });
        });

        describe('#volume', function() {
            before(function() {
                sinon.spy(player._options, 'onSetVolume');
            });

            after(function() {
                player._options.onSetVolume.restore();
            });

            it('should set volume to 50', function() {
                player.volume = 50;
                assert.equal(player._volume, 50);
            });

            it('should call hook onSetVolume', function() {
                assert(player._options.onSetVolume.called);
            });

            it('should return value of current volume', function() {
                assert.equal(player.volume, 50)
            });
        });
    });

    describe('#load', function() {
        before(function() {
            sinon.spy(player._options, 'onLoad');
        });

        after(function() {
            player._options.onLoad.restore()
        });

        it('should set src of iframe', function() {
            player.load('TR4567')
            assert.equal(player._src, `http://player.blitzr.com/TR4567?t=${player._id}`)
            assert.equal(player._iframe.src, `http://player.blitzr.com/TR4567?t=${player._id}`)
        });

        it('should call hook onLoad', function() {
            assert(player._options.onLoad.called)
        });
    });

    describe('#pause', function() {
        it('should send "blitzr_pause" message to iframe', function() {
            player.pause();
            assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_pause' }));
        });
    });

    describe('#play', function() {
        it('should send "blitzr_play" message to iframe', function() {
            player.play();
            assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_play' }));
        });
    });

    describe('#seekTo', function() {
        before(function() {
            sinon.spy(player._options, 'onSeekTo');
        });

        after(function() {
            player._options.onSeekTo.restore();
        });

        it('should send "blitzr_seek" message to iframe', function() {
            player.seekTo(200);
            assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_seek', extra: 200 }));
            player.seekTo(-200);
            assert(player._postToIframe.lastCall.calledWith({ command: 'blitzr_seek', extra: 0 }));
        });

        it('should call hook onSeekTo', function() {
            assert(player._options.onSeekTo.called);
        });
    });

    describe('#stop', function() {
        before(function() {
            sinon.spy(player._options, 'onStop');
        });

        after(function() {
            player._options.onStop.restore();
        });

        it('should set src of iframe to empty string', function() {
            player.stop();
            assert.equal(player._src, '');
            assert.equal(player._iframe.src, '');
        });

        it('should call hook onStop', function() {
            assert(player._options.onStop.called);
        });
    });
});
