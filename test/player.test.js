const assert = require('assert');
const sinon = require('sinon');
const Blitzr = require('../blitzr.js');
const jsdom = require('mocha-jsdom');
var player;

describe('Player', function() {

    jsdom();
    before(function() {
        document.body.innerHTML = '<div id="player"></div>';
    });

    describe('#constructor', function() {
        it('should create instance of Player', function() {
            player = Blitzr.player('player');
            assert.equal(player._el.id, 'player');
            assert.equal(player._el.firstElementChild.nodeName, 'IFRAME');
            assert.equal(player._iframe.width, '200');
            assert.equal(player._iframe.height, '200');
            assert.equal(player._volume, 100);
        });

        it('should init custom options (volume, width, height)', function() {
            player = Blitzr.player('player', {
                initVolume: 50,
                width: 300,
                height: 180
            });
            assert.equal(player._iframe.width, '300');
            assert.equal(player._iframe.height, '180');
            assert.equal(player._volume, 50);
        });
    });
    describe('Volume', function() {
        describe('#_setVolume', function() {
            it('should set volume to 30', function() {
                player._setVolume(30);
                assert.equal(player._volume, 30);
            });

            it('should set volume to 0', function() {
                player._setVolume(-10);
                assert.equal(player._volume, 0);
            });

            it('should set volume to 100', function() {
                player._setVolume(200);
                assert.equal(player._volume, 100);
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

            it('should call hook setVolume', function() {
                assert(player._options.onSetVolume.called);
            });
        });
    });
});
