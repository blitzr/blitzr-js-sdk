import assert from 'assert';
import sinon from 'sinon';
import Blitzr from '../blitzr.js';
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

    describe('#harmonia', function() {
        const tests = [{
            method: 'artist',
            url: '/harmonia/artist/',
            queries: [{
                service_name: 'fnac',
                service_id: '13'
            }]
        }, {
            method: 'label',
            url: '/harmonia/label/',
            queries: [{
                service_name: 'fnac',
                service_id: '13'
            }]
        }, {
            method: 'tag',
            url: '/harmonia/tag/',
            queries: [{
                service_name: 'fnac',
                service_id: '13'
            }]
        }, {
            method: 'searchBySource',
            url: '/harmonia/searchbysource/',
            queries: [{
                service_name: 'fnac',
                service_id: '13'
            }]
        }];

        requestsTester(tests, 'harmonia');
    });

    describe('#label', function() {
        const tests = [{
            method: 'get',
            url: '/label/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'artists',
            url: '/label/artists/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'biography',
            url: '/label/biography/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'harmonia',
            url: '/label/harmonia/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'releases',
            url: '/label/releases/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'similar',
            url: '/label/similar/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }];

        requestsTester(tests, 'label');
    });

    describe('#releases', function() {
        const tests = [{
            method: 'get',
            url: '/releases/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }, {
            method: 'sources',
            url: '/releases/sources/',
            queries: [{
                slug: 'the-black-keys'
            }]
        }];

        requestsTester(tests, 'releases');
    });

    describe('#shop', function() {
        describe('.artist', function() {
            it(`should send request /buy/artist/ with right params`, function() {
                blitzr.shop.artist('fnac', { slug: 'the-black-keys' }).then(() => {
                    assert(blitzr._sendToAPI.calledWith('/buy/artist/fnac/',  { slug: 'the-black-keys' }), '_sendToAPI is called with wrongs params');
                });
            });
        });

        describe('.label', function() {
            it(`should send request /buy/label/ with right params`, function() {
                blitzr.shop.label('fnac', { slug: 'the-black-keys' }).then(() => {
                    assert(blitzr._sendToAPI.calledWith('/buy/label/fnac/',  { slug: 'the-black-keys' }), '_sendToAPI is called with wrongs params');
                });
            });
        });

        describe('.release', function() {
            it(`should send request /buy/release/ with right params`, function() {
                blitzr.shop.release('fnac', { slug: 'the-black-keys' }).then(() => {
                    assert(blitzr._sendToAPI.calledWith('/buy/release/fnac/',  { slug: 'the-black-keys' }), '_sendToAPI is called with wrongs params');
                });
            });
        });

        describe('.track', function() {
            it(`should send request /buy/track/ with right params`, function() {
                blitzr.shop.artist('fnac', { slug: 'the-black-keys' }).then(() => {
                    assert(blitzr._sendToAPI.calledWith('/buy/track/fnac/',  { slug: 'the-black-keys' }), '_sendToAPI is called with wrongs params');
                });
            });
        });
    });

    describe('#tag', function() {
        const tests = [{
            method: 'get',
            url: '/tag/',
            queries: [{
                slug: 'rock'
            }]
        }, {
            method: 'artists',
            url: '/tag/artists/',
            queries: [{
                slug: 'rock'
            }]
        }, {
            method: 'releases',
            url: '/tag/releases/',
            queries: [{
                slug: 'rock'
            }]
        }];

        requestsTester(tests, 'tag');
    });

    describe('#event', function() {
        const tests = [{
            method: 'get',
            url: '/event/',
            queries: [{
                city: 'Paris'
            }]
        }];

        requestsTester(tests, 'event');
    });

    describe('#event', function() {
        const tests = [{
            method: 'get',
            url: '/events/',
            queries: [{
                city: 'Paris'
            }]
        }];

        requestsTester(tests, 'events');
    });
});
