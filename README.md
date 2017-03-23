A JS library to convert and format odds.

# Usage

Odds are constructed by calling the public `from(format, odds)` constructor:

```js
var oddslib = require('oddslib');

// Create from decimal/European odds
var odds = oddslib.from('decimal', 1.20);

// Create from American/Moneyline odds
var odds = oddslib.from('moneyline', -500);

// Create from Hong Kong odds
var odds = oddslib.from('hongKong', .20);

// Create from implied probability
var odds = oddslib.from('impliedProbability', .5)
         = oddslib.from('impliedProbability', '50%');

// Create from UK/fractional odds
var odds = oddslib.from('fractional', 5/2)
         = oddslib.from('fractional', '5/2')
         = oddslib.from('fractional', 2.5);

// Create from Malay odds
var odds = oddslib.from('malay', 0.5);

// Create from Indonesian odds
var odds = oddslib.from('indonesian', -5.0);

```

Odds can then be converted using the `to(format, options?)` instance method:

```js
var odds = oddslib.from('decimal', 1.20);

odds.to('decimal');            // == 1.2
odds.to('moneyline');          // == -500
odds.to('hongKong');           // == 0.2
odds.to('impliedProbability'); // == 0.83̅
odds.to('fractional');         // == "1/5"
odds.to('malay');              // == 0.2
odds.to('indonesian');         // == -5.0
```

The default options are:
```js
{
   precision: null,   // Return a rounded value correct to the nth digit. Do not round if null.
   percentage: false, // Return IP odds as a percentage string. No effect on other formats.
}
```

Fractions are also approximated if the `precision` option is specified, by using the algorithm at [http://www.mindspring.com/~alanh/fracs.html](http://www.mindspring.com/~alanh/fracs.html).

```js
// No approximation
oddslib.from('decimal', 2.33).to('fractional');                  // === "133/100"

// Approximate up to 2nd decimal digit
oddslib.from('decimal', 2.33).to('fractional', {precision: 2});  // === "4/3"
```
