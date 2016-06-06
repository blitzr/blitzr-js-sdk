const Blitzr = require('../lib/blitzr.js').default;

const blitzr = new Blitzr('f1a14162e95f6f0');

blitzr.search.artist({ query: 'eminem' }).then(res => {
    console.log(res);
});
