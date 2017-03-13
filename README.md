A JS library to convert and format odds.

# Usage

Odds are constructed by calling the public from* constructors:

```js
var oddslib = require('oddslib');

// Create from decimal/European odds
var odds = oddslib.fromDecimal(1.20);

// Create from American/Moneyline odds
var odds = oddslib.fromAmerican(-500);

// Create from Hong Kong odds
var odds = oddslib.fromHongKong(.20);

// Create from implied probability
var odds = oddslib.fromImpliedProbability(.5);

```

Odds can then be converted using the to* instance methods:

```js
var odds = oddslib.fromDecimal(1.20);

odds.toDecimal();            // == 1.2
odds.toAmerican();           // == -500
odds.toHongKong();           // == 0.2
odds.toImpliedProbability(); // == 0.83̅
```

# Todo

**Load from, convert to**

- [x] EU/decimal odds
- [x] American odds
- [ ] UK/fractional odds
- [x] Hong Kong odds
- [ ] Malaysian odds
- [ ] Indonesian odds
- [x] Implied probability


**Other features**

- [ ] Formatting
- [ ] Fractional lookup tables
