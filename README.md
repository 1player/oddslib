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
var odds = oddslib.fromFractional(5, 2);

```

Odds can then be converted using the to* instance methods:

```js
var odds = oddslib.fromDecimal(1.20);

odds.toDecimal();            // == 1.2
odds.toMoneyline();           // == -500
odds.toHongKong();           // == 0.2
odds.toImpliedProbability(); // == 0.83̅
odds.toFractional();         // == "1/5"
```

# Todo

**Load from, convert to**

- [x] EU/decimal odds
- [x] American odds
- [x] UK/fractional odds
- [x] Hong Kong odds
- [ ] Malay odds
- [ ] Indonesian odds
- [x] Implied probability


**Other features**

- [ ] Formatting
- [ ] Fractional lookup tables
