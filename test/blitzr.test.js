const assert = require('assert');
const sinon = require('sinon');
const Blitzr = require ('../blitzr.js');
const blitzr = new Blitzr('f1a14162e95f6f0afd4d70e1ad526ad3');

describe('Blitzr', function () {
    var baseURL = 'https://api.blitzr.com/search/?key=f1a14162e95f6f0afd4d70e1ad526ad3',
        data = {
            string: 'lorem ipsum',
            stringEmpty: '',
            int: 42,
            zero: 0,
            float: 3.1416,
            boolTrue: true,
            boolFalse: false,
            arrayEmpty: [],
            objEmpty: {},
            obj: {
                string: 'lorem ipsum',
                stringEmpty: '',
                int: 42,
                zero: 0,
                float: 3.1416
            }
        },
        queryString =
            'string=lorem%20ipsum'
            +'&int=42'
            +'&zero=0'
            +'&float=3.1416'
            +'&boolTrue=true'
            +'&boolFalse=false'
            +'&obj[string]=lorem%20ipsum'
            +'&obj[int]=42'
            +'&obj[zero]=0'
            +'&obj[float]=3.1416'
        ;

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

    describe('#constructor', function() {
        context('no API Key specified', function () {
            it('should throw an error', function() {
                assert.throws(() => new Blitzr());
            });
        });
        it('should create an instance', function() {
            assert.doesNotThrow(() => new Blitzr('f1a14162e95f6f0afd4d70e1ad526ad3'));
        });
    });

    describe('#_toQueryString', function() {
        it('should return string query', function () {
            assert.equal(blitzr._toQueryString(data), queryString);
        });
    });

    describe('#_isEmpty', function() {
        it('should return true for {}, "", []', function () {
            assert(blitzr._isEmpty({}), 'object is not empty');
            assert(blitzr._isEmpty(''), 'string is not empty');
            assert(blitzr._isEmpty([]), 'array is not empty');
            assert(!blitzr._isEmpty({ foo: 'bar' }), 'object is empty');
            assert(!blitzr._isEmpty('foo'), 'string is empty');
            assert(!blitzr._isEmpty(['foo', 'bar']), 'array is empty');
            assert(!blitzr._isEmpty(0), '0 is considered empty');
            assert(!blitzr._isEmpty(1), '1 is considered empty');
            assert(!blitzr._isEmpty(false), 'false is considered empty');
            assert(!blitzr._isEmpty(true), 'true is considered empty');
        });
    });

    describe('#_sendToAPI', function () {
        let request;
        before(function () {
            global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
            XMLHttpRequest.onCreate = function(xhr) {
                request = xhr;
            };
        });

        after(function () {
            XMLHttpRequest.restore();
        });

        it('should send request to API', function () {
            const p = blitzr._sendToAPI('/search/', data);
            request.respond(200, { 'Content-Type': 'application/json' }, '[{ "foo": "bar" }]');
            return p.then(() => {
                assert.equal(request.method, 'GET');
                assert.equal(request.requestHeaders['Content-Type'], 'application/json');
                assert.equal(request.url, baseURL+'&'+queryString);
            });
        });
    });

    describe('#search', function () {
        before(function () {
            sinon.stub(blitzr, '_sendToAPI').returns(Promise.resolve([{ foo: 'bar' }]));
        });

        after(function () {
            blitzr._sendToAPI.restore();
        });

        const tests = [
            {method: 'all', url: '/search/', queries: [
                {
                    query: 'the black keys',
                    type: 'artist, label, release, track'
                }
            ]},
            {method: 'artist', url: '/search/artist/', queries: [
                {
                    query: 'the black keys'
                }
            ]},
            {method: 'city', url: '/search/city/', queries: [
                {
                    query: 'paris'
                },{
                    query: 'Los',
                    autocomplete: true,
                    latitude: 42.1337,
                    longitude: -3.1416
                }
            ]},
            {method: 'country', url: '/search/country/', queries: [
                {
                    country_code: 55
                }
            ]},
            {method: 'label', url: '/search/label/', queries: [
                {
                    query: 'good records'
                }
            ]},
            {method: 'release', url: '/search/release/', queries: [
                {
                    query: '1998'
                }
            ]},
            {method: 'track', url: '/search/track/', queries: [
                {
                    query: 'appel'
                }
            ]}
        ];

        requestsTester(tests, 'search');
    });

    describe('#radio', function () {
        before(function () {
            sinon.stub(blitzr, '_sendToAPI').returns(Promise.resolve([{ foo: 'bar' }]));
        });

        after(function () {
            blitzr._sendToAPI.restore();
        });

        const tests = [
            {method: 'artist', url: '/radio/artist/', queries: [
                {
                    slug: 'the-black-keys'
                }
            ]},
            {method: 'artistSimilar', url: '/radio/artist/similar/', queries: [
                {
                    slug: 'the-black-keys'
                }
            ]},
            {method: 'event', url: '/radio/event/', queries: [
                {
                    slug: 'event'
                }
            ]},
            {method: 'label', url: '/radio/label/', queries: [
                {
                    slug: 'good records'
                }
            ]},
            {method: 'tag', url: '/radio/tag/', queries: [
                {
                    slug: 'tag'
                }
            ]},
            {method: 'venue', url: '/radio/venue/', queries: [
                {
                    venue: 'AccorHotels Arena'
                }
            ]}
        ];

        requestsTester(tests, 'radio');
    });

    describe('#track', function() {
        before(function () {
            sinon.stub(blitzr, '_sendToAPI').returns(Promise.resolve([{ foo: 'bar' }]));
        });

        after(function () {
            blitzr._sendToAPI.restore();
        });

        const tests = [
            {method: 'get', url: '/track/', queries: [
                'TR9Hfgh6dDL7EUDk7x'
            ]},
            {method: 'sources', url: '/track/sources/', queries: [
                'TR9Hfgh6dDL7EUDk7x'
            ]}
        ];

        tests.forEach(test => {
            describe(`.${test.method}`, function() {
                test.queries.forEach(query => {
                    it(`should send request ${test.url} with right params`, function() {
                        return blitzr.track[test.method](query).then(() => {
                            assert(blitzr._sendToAPI.calledWith(test.url, { uuid: query }), '_sendToAPI is called with wrongs params');
                        });
                    });
                });
            });
        });
    });
});
