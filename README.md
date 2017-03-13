A JS library to convert and format odds.

# Usage

Odds are constructed by calling the public from* constructors:

```js
var oddslib = require('oddslib');

// Create decimal/European odds
var odds = oddslib.fromDecimal(1.20);

// Create American/Moneyline odds
var odds = oddslib.fromAmerican(-500);
```

Odds can then be converted using the to* instance methods:

```js
var odds = oddslib.fromDecimal(1.20);

odds.toDecimal();  // == 1.2
odds.toAmerican(); // == -500
```

# Todo

**Load from, convert to**

- [x] EU/decimal odds
- [x] American odds
- [ ] UK/fractional odds
- [ ] Hong Kong odds
- [ ] Malaysian odds
- [ ] Indonesian odds
- [ ] Implied probability


**Other features**

- [ ] Formatting
- [ ] Fractional lookup tables
