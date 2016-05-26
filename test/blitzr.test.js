import assert from 'assert';
import sinon from 'sinon';
import Blitzr from '../src/blitzr.js';
const blitzr = new Blitzr('f1a14162e95f6f0afd4d');

describe('Blitzr', function() {
    var baseURL = 'https://api.blitzr.com/search/?key=f1a14162e95f6f0afd4d',
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
            + '&int=42'
            + '&zero=0'
            + '&float=3.1416'
            + '&boolTrue=true'
            + '&boolFalse=false'
            + '&obj[string]=lorem%20ipsum'
            + '&obj[int]=42'
            + '&obj[zero]=0'
            + '&obj[float]=3.1416'
        ;

    describe('#constructor', function() {
        context('no API Key specified', function() {
            it('should throw an error', function() {
                assert.throws(() => new Blitzr());
            });
        });
        it('should create an instance', function() {
            assert.doesNotThrow(() => new Blitzr('f1a14162e95f6f0afd4d'));
        });
    });

    describe('#_toQueryString', function() {
        it('should return string query', function() {
            assert.equal(blitzr._toQueryString(data), queryString);
        });
    });

    describe('#_isEmpty', function() {
        it('should return true for {}, "", []', function() {
            assert(blitzr._isEmpty({}), 'object is not empty');
            assert(blitzr._isEmpty(''), 'string is not empty');
            assert(blitzr._isEmpty([]), 'array is not empty');
            assert(!blitzr._isEmpty({ foo: 'bar' }), 'object is empty');
            assert(!blitzr._isEmpty('foo'), 'string is empty');
            assert(!blitzr._isEmpty([ 'foo', 'bar' ]), 'array is empty');
            assert(!blitzr._isEmpty(0), '0 is considered empty');
            assert(!blitzr._isEmpty(1), '1 is considered empty');
            assert(!blitzr._isEmpty(false), 'false is considered empty');
            assert(!blitzr._isEmpty(true), 'true is considered empty');
        });
    });

    describe('#_sendToAPI', function() {
        let request;
        before(function() {
            global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
            XMLHttpRequest.onCreate = function(xhr) {
                request = xhr;
            };
        });

        after(function() {
            XMLHttpRequest.restore();
        });

        it('should send request to API', function() {
            const p = blitzr._sendToAPI('/search/', data);
            request.respond(200, { 'Content-Type': 'application/json' }, '[{ "foo": "bar" }]');
            return p.then(() => {
                assert.equal(request.method, 'GET');
                assert.equal(request.requestHeaders['Content-Type'], 'application/json');
                assert.equal(request.url, baseURL + '&' + queryString);
            });
        });
    });

    describe('#key', function() {
        it('should set the key API', function() {
            blitzr.key = 'keykeykey12345';
            assert.equal(blitzr._key, 'keykeykey12345');
        });
        it('should return key API', function() {
            const myKey = blitzr.key;
            assert.equal(myKey, 'keykeykey12345');
        });
    });
});
