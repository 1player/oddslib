var Odds = (function() {
  // Private constructor pattern
  // from http://stackoverflow.com/a/21731713
  var PublicOdds = function() {
    throw new Error('This constructor is private, please use the from* functions');
  };

  var Odds = function(decimalValue) {
    this.decimalValue = decimalValue;
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

  // Conversion API
  PublicOdds.prototype.toDecimal = function() {
    return this.decimalValue;
  };

  return PublicOdds;
}());

module.exports = {
  Odds: Odds,

  fromDecimal: Odds.fromDecimal,
  fromAmerican: Odds.fromAmerican,
};
