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

  PublicOdds.fromAmerican = function(american) {
    var decimal;
    if (american > 0) {
      decimal = (american / 100.0) + 1;
    } else {
      decimal = (100 / -american) + 1;
    }
    return new Odds(decimal);
  };

  PublicOdds.fromHongKong = function(hongKong) {
    return new Odds(hongKong + 1.0);
  };

  PublicOdds.fromImpliedProbability = function(ip) {
    return new Odds(1.0 / ip);
  };

  return PublicOdds;
}());


// Conversion API
Odds.prototype.toDecimal = function() {
  return this.decimalValue;
};

Odds.prototype.toAmerican = function() {
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


module.exports = {
  Odds: Odds,

  fromDecimal: Odds.fromDecimal,
  fromAmerican: Odds.fromAmerican,
  fromHongKong: Odds.fromHongKong,
  fromImpliedProbability: Odds.fromImpliedProbability,
};
