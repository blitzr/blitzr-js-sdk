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
    // describe('#search', function() {
    //     describe('.all', function () {
    //         it('should return data in an array', function(done) {
    //             const data = {
    //                 query: 'the black keys'
    //             }
    //             blitzr.search.all(data).then(res => {
    //                 assert.equal(typeof res, 'array');
    //                 done();
    //             }).catch((res) => { done(res) });
    //         });
    //     });
    //
    //     describe('.artist', function() {
    //         it('should return data in an array', function(done) {
    //             const data = {
    //                 query: 'the black keys'
    //             };
    //             blitzr.search.artist(data).then(res => {
    //                 assert.equal(typeof res, 'array');
    //                 done();
    //             }).catch((res) => { done(res) });
    //         });
    //     });
    //
    //     describe('.city', function() {
    //         it('should return data in an array', function(done) {
    //             const data = {
    //                 query: 'lyon'
    //             };
    //             blitzr.search.city(data).then(res => {
    //                 assert.equal(typeof res, 'array');
    //                 done();
    //             }).catch((res) => { done(res) });
    //         });
    //
    //         it('search by latitude/longitude', function(done) {
    //             const data = {
    //                 latitude: 44.8404400,
    //                 longitude: -0.5805000,
    //             };
    //             blitzr.search.city(data).then(res => {
    //                 assert.equal(typeof res, 'array');
    //                 done();
    //             }).catch((res) => { done(res) });
    //         });
    //     });
    // });
});
