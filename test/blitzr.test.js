const assert = require('assert');
const sinon = require('sinon');
const Blitzr = require ('../blitzr.js');

describe('Blitzr', function () {
    var blitzr,
        baseURL = 'https://api.blitzr.com/search/?key=f1a14162e95f6f0afd4d70e1ad526ad3',
        data = {
            string: 'lorem ipsum',
            stringEmpty: '',
            int: 42,
            zero: 0,
            float: 3.1416,
            boolTrue: true,
            boolFalse: false,
            arrayEmpty: [],
            objEmpty: {}
        },
        queryString =
            'string=lorem%20ipsum'
            +'&int=42'
            +'&zero=0'
            +'&float=3.1416'
            +'&boolTrue=true'
            +'&boolFalse=false'
        ;

    describe('#constructor', function() {
        it('should throw an error', function() {
            assert.throws(() => new Blitzr());
        });
        it('should create an instance', function() {
            assert.doesNotThrow(() => {
                blitzr = new Blitzr('f1a14162e95f6f0afd4d70e1ad526ad3');
            });
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

    describe('#_sendToAPI', function() {
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

    describe('#search', function() {
        before(function () {
            sinon.stub(blitzr, '_sendToAPI').returns(Promise.resolve([{ foo: 'bar' }]));
        });

        after(function () {
            blitzr._sendToAPI.restore();
        });

        const tests = [
            {method: 'all', url: '/search/', query: 'the black keys', data: {
                query: 'the black keys',
                type: 'artist, label, release, track',
                autocomplete: false,
                limit: 10,
                start: 0,
                extras: false
            }},
            {method: 'artist', url: '/search/artist/', query: 'the black keys', data: {
                query: 'the black keys',
                filters: {},
                autocomplete: false,
                limit: 10,
                start: 0,
                extras: false
            }}
        ];

        tests.forEach(test => {
            describe(`.${test.method}`, function() {
                it(`should send request ${test.url}`, function() {
                    return blitzr.search[test.method](test.query).then(() => {
                        assert(blitzr._sendToAPI.calledWith(test.url, test.data), '_sendToAPI is called with wrongs params');
                    });
                });
            });
        });
    });
});
