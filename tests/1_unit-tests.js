const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('ConvertHandler should correctly read a whole number input', function() {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('ConvertHandler should correctly read a decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('3.5km'), 3.5);
  });

  test('ConvertHandler should correctly read a fractional input', function() {
    assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5);
  });

  test('ConvertHandler should correctly read a fractional input with a decimal', function() {
    assert.strictEqual(convertHandler.getNum('2.5/2mi'), 1.25);
  });

  test('ConvertHandler should correctly return an error on a double-fraction', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('ConvertHandler should correctly default to a numerical input of 1', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('ConvertHandler should correctly read each valid input unit', function() {
    ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].forEach(unit => {
      assert.strictEqual(convertHandler.getUnit(`10${unit}`), unit);
    });
  });

  test('ConvertHandler should correctly return an error for an invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('10g'), 'invalid unit');
  });

  test('ConvertHandler should return the correct return unit for each valid input unit', function() {
    const expected = { gal: 'L', L: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs' };
    Object.entries(expected).forEach(([unit, result]) => {
      assert.strictEqual(convertHandler.getReturnUnit(unit), result);
    });
  });

  test('ConvertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const expected = { gal: 'gallons', L: 'liters', mi: 'miles', km: 'kilometers', lbs: 'pounds', kg: 'kilograms' };
    Object.entries(expected).forEach(([unit, result]) => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), result);
    });
  });

  test('ConvertHandler should correctly convert gal to L', function() {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('ConvertHandler should correctly convert L to gal', function() {
    assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
  });

  test('ConvertHandler should correctly convert mi to km', function() {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('ConvertHandler should correctly convert km to mi', function() {
    assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
  });

  test('ConvertHandler should correctly convert lbs to kg', function() {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('ConvertHandler should correctly convert kg to lbs', function() {
    assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
  });
});