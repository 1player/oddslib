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
    if (typeof d === "undefined") {
      // Try to split on the slash
      var pieces = n.toString().split("/");

      n = parseFloat(pieces[0]);

      if (pieces.length === 2) {
	d = parseFloat(pieces[1]);
      } else if (pieces.length === 1) {
	d = 1;
      } else {
	throw new Error('Invalid fraction');
      }
    }

    return new Odds(1 + (n / d));
  };

  PublicOdds.fromMalay = function(malay) {
    if (malay < 0) {
      malay = -1 / malay;
    }
    return new Odds(malay + 1);
  };

  PublicOdds.fromIndonesian = function(indonesian) {
    if (indonesian >= 1) {
      return new Odds(indonesian + 1);
    }
    return new Odds( (-1 / indonesian) + 1 );
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

Odds.prototype.toMalay = function() {
  if (this.decimalValue <= 2.0) {
    return fixFloatError(this.decimalValue - 1);
  }
  return fixFloatError(-1 / (this.decimalValue - 1));
};

Odds.prototype.toIndonesian = function() {
  if (this.decimalValue < 2.0) {
    return fixFloatError( -1 / (this.decimalValue - 1));
  }
  return fixFloatError(this.decimalValue - 1);
};

module.exports = {
  Odds: Odds,

  fromDecimal: Odds.fromDecimal,
  fromMoneyline: Odds.fromMoneyline,
  fromHongKong: Odds.fromHongKong,
  fromImpliedProbability: Odds.fromImpliedProbability,
  fromFractional: Odds.fromFractional,
  fromMalay: Odds.fromMalay,
  fromIndonesian: Odds.fromIndonesian,
};
