function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', name: 'gallons' },
    L: { returnUnit: 'gal', name: 'liters' },
    mi: { returnUnit: 'km', name: 'miles' },
    km: { returnUnit: 'mi', name: 'kilometers' },
    lbs: { returnUnit: 'kg', name: 'pounds' },
    kg: { returnUnit: 'lbs', name: 'kilograms' }
  };

  this.getNum = function(input) {
    const unitStart = input.search(/[a-z]/i);
    const numberPart = unitStart === -1 ? input : input.slice(0, unitStart);

    if (numberPart === '') return 1;

    const numericPattern = /^\d+(?:\.\d*)?(?:\/\d+(?:\.\d*)?)?$/;
    if (!numericPattern.test(numberPart)) {
      return 'invalid number';
    }

    const parts = numberPart.split('/');
    const numerator = Number(parts[0]);
    const denominator = parts.length === 2 ? Number(parts[1]) : 1;

    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return 'invalid number';
    }

    return Number((numerator / denominator).toFixed(5));
  };

  this.getUnit = function(input) {
    const unitStart = input.search(/[a-z]/i);
    const rawUnit = unitStart === -1 ? '' : input.slice(unitStart);
    const unit = rawUnit.toLowerCase() === 'l' ? 'L' : rawUnit.toLowerCase();

    return Object.prototype.hasOwnProperty.call(units, unit) ? unit : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unit = units[initUnit];
    return unit ? unit.returnUnit : 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    return units[unit] ? units[unit].name : 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversions = {
      gal: initNum * galToL,
      L: initNum / galToL,
      mi: initNum * miToKm,
      km: initNum / miToKm,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg
    };

    return Number(conversions[initUnit].toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
