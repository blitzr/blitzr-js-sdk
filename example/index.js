const Blitzr = require('../lib/index.js');

const blitzr = new Blitzr(process.env.KEY_BLITZR_API);

blitzr.search.artist({ query: 'eminem' }).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
