'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function(req, res) {
    const input = req.query.input;
    if (!input) {
      return res.json({ error: 'invalid number and unit' });
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.status(200).json({ error: 'invalid number and unit' });
    }
    if (initNum === 'invalid number') {
      return res.status(200).json({ error: 'invalid number' });
    }
    if (initUnit === 'invalid unit') {
      return res.status(200).json({ error: 'invalid unit' });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    });
  });
};
