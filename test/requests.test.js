const assert = require('assert');
const sinon = require('sinon');
const Blitzr = require('../blitzr.js');
const blitzr = new Blitzr('f1a14162e95f6f0afd4d');

function requestsTester(tests, property) {
    tests.forEach(test => {
        describe(`.${test.method}`, function() {
            test.queries.forEach(query => {
                it(`should send request ${test.url} with right params`, function() {
                    return blitzr[property][test.method](query).then(() => {
                        assert(blitzr._sendToAPI.calledWith(test.url, query), '_sendToAPI is called with wrongs params');
                    });
                });
            });
        });
    });
}

describe('Request', function() {
    before(function() {
        sinon.stub(blitzr, '_sendToAPI').returns(Promise.resolve([{ foo: 'bar' }]));
    });

    after(function() {
        blitzr._sendToAPI.restore();
    });

    describe('#search', function() {
        const tests = [{
            method: 'all',
            url: '/search/',
            queries: [{
                query: 'the black keys',
                type: 'artist, label, release, track'
            }]
        }, {
            method: 'artist',
            url: '/search/artist/',
            queries: [{
                query: 'the black keys'
            }]
        }, {
            method: 'city',
            url: '/search/city/',
            queries: [{
                query: 'paris'
            }, {
                query: 'Los',
                autocomplete: true,
                latitude: 42.1337,
                longitude: -3.1416
            }]
        }, {
            method: 'country',
            url: '/search/country/',
            queries: [{
                country_code: 55
            }]
        }, {
            method: 'label',
            url: '/search/label/',
            queries: [{
                query: 'good records'
            }]
        }, {
            method: 'release',
            url: '/search/release/',
            queries: [{
                query: '1998'
            }]
        }, {
            method: 'track',
            url: '/search/track/',
            queries: [{
                query: 'appel'
            }]
        }];

        requestsTester(tests, 'search');
    });

    describe('#radio', function() {
        const tests = [{
            method: 'artist',
            url: '/radio/artist/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'artistSimilar',
            url: '/radio/artist/similar/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'event',
            url: '/radio/event/',
            queries: [{
                slug: 'event'
            }]
        }, {
            method: 'label',
            url: '/radio/label/',
            queries: [{
                slug: 'good records'
            }]
        }, {
            method: 'tag',
            url: '/radio/tag/',
            queries: [{
                slug: 'tag'
            }]
        }, {
            method: 'venue',
            url: '/radio/venue/',
            queries: [{
                venue: 'AccorHotels Arena'
            }]
        }];

        requestsTester(tests, 'radio');
    });

    describe('#track', function() {
        const tests = [{
            method: 'get',
            url: '/track/',
            queries: [{
                uuid: 'TR9Hfgh6dDL7EUDk7x'
            }]
        }, {
            method: 'sources',
            url: '/track/sources/',
            queries: [{
                uuid: 'TR9Hfgh6dDL7EUDk7x'
            }]
        }];

        requestsTester(tests, 'track');
    });

    describe('#artist', function() {
        const tests = [{
            method: 'get',
            url: '/artist/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'aliases',
            url: '/artist/aliases/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'bands',
            url: '/artist/bands/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'biography',
            url: '/artist/biography/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'events',
            url: '/artist/events/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'harmonia',
            url: '/artist/harmonia/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'members',
            url: '/artist/members/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'related',
            url: '/artist/related/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'releases',
            url: '/artist/releases/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'similar',
            url: '/artist/similar/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'summary',
            url: '/artist/summary/',
            queries: [{
                slug: 'eminem'
            }]
        }, {
            method: 'websites',
            url: '/artist/websites/',
            queries: [{
                slug: 'eminem'
            }]
        }];

        requestsTester(tests, 'artist');
    });

    describe('#event', function() {
        it(`should send request /event/ with right params`, function() {
            return blitzr.event({ city: 'Paris' }).then(() => {
                assert(blitzr._sendToAPI.calledWith('/event/', { city: 'Paris' }), '_sendToAPI is called with wrongs params');
            });
        });
    });

    describe('#events', function() {
        it(`should send request /events/ with right params`, function() {
            return blitzr.events({ city: 'Paris' }).then(() => {
                assert(blitzr._sendToAPI.calledWith('/events/', { city: 'Paris' }), '_sendToAPI is called with wrongs params');
            });
        });
    });
});
