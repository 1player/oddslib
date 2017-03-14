A JS library to convert and format odds.

# Usage

Odds are constructed by calling the public from* constructors:

```js
var oddslib = require('oddslib');

// Create from decimal/European odds
var odds = oddslib.fromDecimal(1.20);

// Create from American/Moneyline odds
var odds = oddslib.fromMoneyline(-500);

// Create from Hong Kong odds
var odds = oddslib.fromHongKong(.20);

// Create from implied probability
var odds = oddslib.fromImpliedProbability(.5);

// Create from UK/fractional odds
var odds = oddslib.fromFractional(5, 2)
         = oddslib.fromFractional("5/2")
         = oddslib.fromFractional(2.5);

// Create from Malay odds
var odds = oddslib.fromMalay(0.5);

// Create from Indonesian odds
var odds = oddslib.fromIndonesian(-5.0);

```

Or using the generic constructor:

```js
oddslib.from('decimal', 1.2);
oddslib.from('moneyline, -500);
oddslib.from('hongKong, .2);
oddslib.from('impliedProbability', .5);
oddslib.from('fractional', "5/2");
oddslib.from('malay', 0.5);
oddslib.from('indonesian', -5.0);
```

Odds can then be converted using the to* instance methods:

```js
var odds = oddslib.fromDecimal(1.20);

odds.toDecimal();            // == 1.2
odds.toMoneyline();          // == -500
odds.toHongKong();           // == 0.2
odds.toImpliedProbability(); // == 0.83̅
odds.toFractional();         // == "1/5"
odds.toMalay();              // == 0.2
odds.toIndonesian();         // == -5.0
```

# Todo

**Load from, convert to**

- [x] EU/decimal odds
- [x] American odds
- [x] UK/fractional odds
- [x] Hong Kong odds
- [x] Malay odds
- [x] Indonesian odds
- [x] Implied probability


**Other features**

- [ ] Throw error when invalid odds are passed
- [ ] Formatting
- [ ] Fractional lookup tables
