const assert = require('assert');
const Blitzr = require('../blitzr.js');
const jsdom = require('mocha-jsdom');
var player;

describe.only('Player', function() {

    jsdom();
    before(function() {
        document.body.innerHTML = '<div id="player"></div>';
    });

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
