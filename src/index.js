const Player = require('./player.js');

class Blitzr {
    constructor() {
        this.Player = Player;
    }
}

module.exports = new Blitzr();
