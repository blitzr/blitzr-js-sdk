const assert = require('assert');
const blitzr = require ('../blitzr.js');

describe('Blitzr', function () {
    describe('#toStringQuery', function() {
        it('should return string query', function () {
            const data = {
                string: '   a b c6890 -A- lorem    ',
                bool: true,
                boolean: false,
                int: 10
            };
            const str = blitzr._toStringQuery(data);
            assert.equal(str, '?string=a+b+c6890+-A-+lorem&bool=true&boolean=false&int=10');
        });
        it('faild', function() {
            assert.equal(true, false)
        })
    });
});
