const assert = require('assert');
const Blitzr = require ('../blitzr.js');
const blitzr = new Blitzr('f1a14162e95f6f0afd4d70e1ad526ad3');

describe('Blitzr', function () {
    describe('#toQueryString', function() {
        it('should return string query', function () {
            const data = {
                string: 'lorem ipsum',
                filter: {},
                zero: 0,
                empty: '',
                bool: true,
                boolean: false,
                int: 10,
                obj: {
                    location: 'bordeaux',
                    tag: 'jazz',
                    num: 1337,
                    bool: false
                }
            };
            const str = blitzr._toQueryString(data);
            assert.equal(str, 'string=lorem%20ipsum&zero=0&bool=true&boolean=false&int=10&obj[location]=bordeaux&obj[tag]=jazz&obj[num]=1337&obj[bool]=false');
        });
    });
    describe('#search.artist', function() {
        it('should return data in an array', function() {
            const data = {
                query: 'the black keys'
            }
            const artist = blitzr.search.artist(data).then(res => {
                assert.equal(typeof res, 'array')
            })
        });
    });
});
