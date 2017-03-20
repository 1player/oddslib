A JS library to convert and format odds.

# Usage

Odds are constructed by calling the public `from` constructor:

```js
var oddslib = require('oddslib');

// Create from decimal/European odds
var odds = oddslib.from('decimal', 1.20);

// Create from American/Moneyline odds
var odds = oddslib.from('moneyline', -500);

// Create from Hong Kong odds
var odds = oddslib.from('hongKong', .20);

// Create from implied probability
var odds = oddslib.from('impliedProbability', .5);

// Create from UK/fractional odds
var odds = oddslib.from('fractional', 5/2)
         = oddslib.from('fractional', "5/2")
         = oddslib.from('fractional', 2.5);

// Create from Malay odds
var odds = oddslib.from('malay', 0.5);

// Create from Indonesian odds
var odds = oddslib.from('indonesian', -5.0);

```

Odds can then be converted using the `to` instance method:

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

- [x] Throw error when invalid odds are passed
- [x] Throw error when odds are outside valid range
