const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: '10 liters converts to 2.64172 gallons'
        });
        done();
      });
  });

  test('Convert an invalid input such as 32g', function(done) {
    const invalidUnits = ['32g', '10kilomegagram', '1xyz'];
    let completed = 0;

    invalidUnits.forEach(input => {
      chai.request(server)
        .get('/api/convert')
        .query({ input })
        .end(function(err, res) {
          assert.isNull(err);
          assert.strictEqual(res.status, 200);
          assert.deepEqual(res.body, { error: 'invalid unit' });
          completed += 1;
          if (completed === invalidUnits.length) done();
        });
    });
  });

  test('Convert an invalid number such as 3/7.2/4kg', function(done) {
    const invalidNumbers = ['3/2/3kg', '3/7.2/4kg'];
    let completed = 0;

    invalidNumbers.forEach(input => {
      chai.request(server)
        .get('/api/convert')
        .query({ input })
        .end(function(err, res) {
          assert.isNull(err);
          assert.strictEqual(res.status, 200);
          assert.deepEqual(res.body, { error: 'invalid number' });
          completed += 1;
          if (completed === invalidNumbers.length) done();
        });
    });
  });

  test('Convert an invalid number AND unit', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, { error: 'invalid number and unit' });
        done();
      });
  });

  test('Convert with no number such as kg', function(done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.isNull(err);
        assert.strictEqual(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: '1 kilograms converts to 2.20462 pounds'
        });
        done();
      });
  });
});
