var n2f = require('num2fraction');

// 1.2 - 1.0 === 0.19999999999999996
// fixFloatError(1.2 - 1.0) === 0.2
var fixFloatError = function(n) {
  return parseFloat(n.toPrecision(12));
};

var FORMATS = {
  // European/Decimal format
  decimal: {
    from: function(decimal) {
      return parseFloat(decimal);
    },
    to: function() {
      return this.decimalValue;
    },
  },

  // American/Moneyline format
  moneyline: {
    from: function(moneyline) {
      moneyline = parseFloat(moneyline);

      if (moneyline > 0) {
	return (moneyline / 100.0) + 1;
      }
      return (100 / -moneyline) + 1;
    },
    to: function() {
      if (this.decimalValue >= 2) {
	return fixFloatError((this.decimalValue - 1) * 100.0);
      }
      return fixFloatError(-100 / (this.decimalValue - 1));
    },
  },

  // Hong Kong format
  hongKong: {
    from: function(hongKong) {
      return parseFloat(hongKong) + 1.0;
    },
    to: function() {
      return fixFloatError(this.decimalValue - 1);
    },
  },

  // Implied probability
  impliedProbability: {
    from: function(ip) {
      return 1.0 / parseFloat(ip);
    },
    to: function() {
      return fixFloatError(1 / this.decimalValue);
    },
  },

  // UK/Fractional format
  fractional: {
    from: function(n) {
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

      return 1 + (n / d);
    },
    to: function() {
      return n2f(fixFloatError(this.decimalValue - 1));
    },
  },

  // Malay format
  malay: {
    from: function(malay) {
      malay = parseFloat(malay);

      if (malay < 0) {
	malay = -1 / malay;
      }
      return malay + 1;
    },
    to: function() {
      if (this.decimalValue <= 2.0) {
	return fixFloatError(this.decimalValue - 1);
      }
      return fixFloatError(-1 / (this.decimalValue - 1));
    },
  },

  // Indonesian format
  indonesian: {
    from: function(indonesian) {
      indonesian = parseFloat(indonesian);

      if (indonesian >= 1) {
	return indonesian + 1;
      }
      return (-1 / indonesian) + 1;
    },
    to: function() {
      if (this.decimalValue < 2.0) {
	return fixFloatError( -1 / (this.decimalValue - 1));
      }
      return fixFloatError(this.decimalValue - 1);
    },
  },
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

  // Generic constructor
  PublicOdds.from = function(format, value) {
    if (!FORMATS.hasOwnProperty(format)) {
      throw new Error("Unknown format " + format + ".");
    }
    var decimal = FORMATS[format].from(value);
    return new Odds(decimal);
  };

  return PublicOdds;
}());


// Conversion API
Odds.prototype.to = function(format) {
  if (!FORMATS.hasOwnProperty(format)) {
    throw new Error("Unknown format " + format + ".");
  }
  return FORMATS[format].to.call(this);
};

module.exports = {
  Odds: Odds,

  from: Odds.from,
};
