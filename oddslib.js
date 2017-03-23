var approximateFraction = require('./approx_fraction.js');

// Object.assign polyfill
if (typeof Object.assign != 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// 1.2 - 1.0 === 0.19999999999999996
// fixFloatError(1.2 - 1.0) === 0.2
var fixFloatError = function(n) {
  return parseFloat(n.toPrecision(12));
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}


var FORMATS = {
  // European/Decimal format
  decimal: {
    from: function(decimal) {
      decimal = parseFloat(decimal);
      if (decimal <= 1.0) {
	throw new Error("Outside valid range.");
      }
      return decimal;
    },
    to: function() {
      return this.decimalValue;
    },
  },

  // American/Moneyline format
  moneyline: {
    from: function(moneyline) {
      moneyline = parseFloat(moneyline);

      if (moneyline >= 0) {
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
      hongKong = parseFloat(hongKong);
      if (hongKong < 0.0) {
	throw new Error("Outside valid range.");
      }
      return hongKong + 1.0;
    },
    to: function() {
      return fixFloatError(this.decimalValue - 1);
    },
  },

  // Implied probability
  impliedProbability: {
    from: function(ip) {
      // Handle percentage string
      if (typeof ip === "string" && ip.slice(-1) == "%") {
	ip = parseFloat(ip) / 100.0;
      } else {
	ip = parseFloat(ip);
      }

      if (ip <= 0.0 || ip >= 1.0) {
	throw new Error("Outside valid range");
      }

      return 1.0 / ip;
    },
    to: function(options) {
      if (options.percentage) {
	var value = fixFloatError(100.0 / this.decimalValue);

	// HACK: Oddslib.prototype.to calls decimalAdjust if we return a number.
	// But we need to round before adding the % symbol.
	// So we do it here and return the string
	if (options.precision !== null) {
	  value = decimalAdjust('round', value, -options.precision);
	}

	return value.toString() + "%";
      }

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

      if (n === 0 || d === 0 || (n/d) <= 0.0) {
	throw new Error('Outside valid range');
      }

      return 1 + (n / d);
    },
    to: function(options) {
      return approximateFraction(this.decimalValue - 1, options.precision || 12);
    },
  },

  // Malay format
  malay: {
    from: function(malay) {
      malay = parseFloat(malay);

      if (malay <= -1.0 || malay > 1.0) {
	throw new Error("Outside valid range.");
      }

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

      if (indonesian === 0) {
	throw new Error("Outside valid range.");
      }

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
    if (typeof decimalValue !== "number" || isNaN(decimalValue)) {
      throw new Error("Invalid odds");
    }

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
Odds.prototype.to = function(format, options) {
  if (!FORMATS.hasOwnProperty(format)) {
    throw new Error("Unknown format " + format + ".");
  }

  options = Object.assign({
    precision: null,
    percentage: false,
  }, options);

  var ret = FORMATS[format].to.call(this, options);
  if (typeof ret === "number" && options.precision !== null) {
    ret = decimalAdjust('round', ret, -options.precision);
  }
  return ret;
};

module.exports = {
  Odds: Odds,

  from: Odds.from,
};
