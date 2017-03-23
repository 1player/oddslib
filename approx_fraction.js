// From http://www.mindspring.com/~alanh/fracs.html

// Approximate decimal number `d` into the returned fraction `frac`,
// so that |frac - d| < (10^-precision / 2).
// In other words, return an approximate fraction correct up to the
// `precision`th decimal place.
function approximateFraction(d, precision) {
  var numerators = [0, 1];
  var denominators = [1, 0];

  var maxNumerator = getMaxNumerator(d);
  var d2 = d;
  var calcD, prevCalcD = NaN;

  var acceptableError = Math.pow(10, -precision) / 2;

  for (var i = 2; i < 1000; i++)  {
    var L2 = Math.floor(d2);
    numerators[i] = L2 * numerators[i-1] + numerators[i-2];
    if (Math.abs(numerators[i]) > maxNumerator) return;

    denominators[i] = L2 * denominators[i-1] + denominators[i-2];

    calcD = numerators[i] / denominators[i];

    if (Math.abs(calcD - d) < acceptableError ||
	calcD == prevCalcD) {
      return numerators[i].toString() + "/" + denominators[i].toString();
    }

    d2 = 1/(d2-L2);
  }
}

function getMaxNumerator(f)
{
  var f2 = null;
  var ixe = f.toString().indexOf("E");
  if (ixe == -1) ixe = f.toString().indexOf("e");
  if (ixe == -1) f2 = f.toString();
  else f2 = f.toString().substring(0, ixe);

  var digits = null;
  var ix = f2.toString().indexOf(".");
  if (ix==-1) digits = f2;
  else if (ix===0) digits = f2.substring(1, f2.length);
  else if (ix < f2.length) digits = f2.substring(0, ix) + f2.substring(ix + 1, f2.length);

  var L = digits;

  var numDigits = L.toString().length;
  var L2 = f;
  var numIntDigits = L2.toString().length;
  if (L2 === 0) numIntDigits = 0;
  var numDigitsPastDecimal = numDigits - numIntDigits;

  var i;
  for (i=numDigitsPastDecimal; i>0 && L%2===0; i--) L/=2;
  for (i=numDigitsPastDecimal; i>0 && L%5===0; i--) L/=5;

  return L;
}

module.exports = approximateFraction;
