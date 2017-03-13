var n2f = require('num2fraction');

// 1.2 - 1.0 === 0.19999999999999996
// fixFloatError(1.2 - 1.0) === 0.2
var fixFloatError = function(n) {
  return parseFloat(n.toPrecision(12));
};

var Odds = (function() {
  // Private constructor pattern
  // from http://stackoverflow.com/a/21731713
  var PublicOdds = function() {
    throw new Error('This constructor is private, please use the from* functions');
  };
  var Odds = function(decimalValue) {
    this.decimalValue = fixFloatError(decimalValue);
  };
  Odds.prototype = PublicOdds.prototype;

  // Public constructors
  PublicOdds.fromDecimal = function(decimal) {
    return new Odds(decimal);
  };

  PublicOdds.fromMoneyline = function(moneyline) {
    var decimal;
    if (moneyline > 0) {
      decimal = (moneyline / 100.0) + 1;
    } else {
      decimal = (100 / -moneyline) + 1;
    }
    return new Odds(decimal);
  };

  PublicOdds.fromHongKong = function(hongKong) {
    return new Odds(hongKong + 1.0);
  };

  PublicOdds.fromImpliedProbability = function(ip) {
    return new Odds(1.0 / ip);
  };

  PublicOdds.fromFractional = function(n, d) {
    return new Odds(1 + (n / d));
  };

  return PublicOdds;
}());


// Conversion API
Odds.prototype.toDecimal = function() {
  return this.decimalValue;
};

Odds.prototype.toMoneyline = function() {
  if (this.decimalValue >= 2) {
    return fixFloatError((this.decimalValue - 1) * 100.0);
  }
  return fixFloatError(-100 / (this.decimalValue - 1));
};

Odds.prototype.toHongKong = function() {
  return fixFloatError(this.decimalValue - 1);
};

Odds.prototype.toImpliedProbability = function() {
  return fixFloatError(1 / this.decimalValue);
};

Odds.prototype.toFractional = function() {
  return n2f(fixFloatError(this.decimalValue - 1));
};

module.exports = {
  Odds: Odds,

  fromDecimal: Odds.fromDecimal,
  fromMoneyline: Odds.fromMoneyline,
  fromHongKong: Odds.fromHongKong,
  fromImpliedProbability: Odds.fromImpliedProbability,
  fromFractional: Odds.fromFractional,
};
