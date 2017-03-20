var should = require('chai').should(),
    expect = require('chai').expect;

var oddslib = require('../oddslib');

describe('decimal odds', function() {
  it('can be constructed', function() {
    oddslib.from('decimal', 1.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('decimal', 1.5).to('decimal').should.equal(1.5);
    oddslib.from('decimal', '1.5').to('decimal').should.equal(1.5);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.5).to('decimal').should.equal(1.5);
  });

  it('throws an error when outside range', function() {
    // valid range: x >= 1.0
    oddslib.from('decimal', 1.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('decimal', 10.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('decimal', 100000.0).should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('decimal', 0.98); }).to.throw(Error);
    expect(function() { oddslib.from('decimal', 0); }).to.throw(Error);
    expect(function() { oddslib.from('decimal', -0.5); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('decimal', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('decimal', '-'); }).to.throw(Error);
  });
});

describe('Moneyline odds', function() {
  it('can be constructed', function() {
    oddslib.from('moneyline', -500).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('moneyline', -500).to('decimal').should.equal(1.20);
    oddslib.from('moneyline', '-500').to('decimal').should.equal(1.20);
    oddslib.from('moneyline', 500).to('decimal').should.equal(6.00);
    oddslib.from('moneyline', 0).to('decimal').should.equal(1.0);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.8).to('moneyline').should.equal(-125);
    oddslib.from('decimal', 4.5).to('moneyline').should.equal(350);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('moneyline', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('moneyline', '-'); }).to.throw(Error);
  });
});

describe('Hong Kong odds', function() {
  it('can be constructed', function() {
    oddslib.from('hongKong', 0.2).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('hongKong', 0.2).to('decimal').should.equal(1.20);
    oddslib.from('hongKong', '0.2').to('decimal').should.equal(1.20);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.2).to('hongKong').should.equal(0.20);
    oddslib.from('decimal', 11.76).to('hongKong').should.equal(10.76);
  });

  it('throws an error when outside range', function() {
    // valid range: x >= 0.0
    oddslib.from('hongKong', 0.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('hongKong', 1.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('hongKong', 10.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('hongKong', 100000.0).should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('hongKong', -0.5); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('hongKong', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('hongKong', '-'); }).to.throw(Error);
  });
});

describe('Fractional odds', function() {
  it('can be constructed', function() {
    oddslib.from('fractional', "5/2").to('decimal').should.equal(3.50);
    oddslib.from('fractional', 5/2).to('decimal').should.equal(3.50);
    oddslib.from('fractional', 2.5).to('decimal').should.equal(3.50);

    expect(function() { oddslib.from('fractional', "5/2/3"); }).to.throw(Error);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.40).to('fractional').should.equal("2/5");
    oddslib.from('decimal', 3.50).to('fractional').should.equal("5/2");
    oddslib.from('decimal', 2).to('fractional').should.equal("1/1");
  });

  it('throws an error when outside range', function() {
    // valid range: x > 0 and denominator != 0
    oddslib.from('fractional', 0.1).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('fractional', "0.1/3").should.be.an.instanceof(oddslib.Odds);
    oddslib.from('fractional', "3/1").should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('fractional', 0); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', "0/0"); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', "0/3"); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', "3/0"); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', "-5/2"); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', "2/-5"); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('fractional', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', '5/'); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', '5//2'); }).to.throw(Error);
    expect(function() { oddslib.from('fractional', '-'); }).to.throw(Error);
  });
});

describe('Implied probability', function() {
  it('can be constructed', function() {
    oddslib.from('impliedProbability', 0.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('impliedProbability', 0.5).to('decimal').should.equal(2.00);
    oddslib.from('impliedProbability', '0.5').to('decimal').should.equal(2.00);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.60).to('impliedProbability').should.equal(0.625);
    oddslib.from('decimal', 2.50).to('impliedProbability').should.equal(0.4);
    oddslib.from('decimal', 1).to('impliedProbability').should.equal(1);
  });

  it('throws an error when outside range', function() {
    // valid range: 0 < x < 1.0
    oddslib.from('impliedProbability', 0.1).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('impliedProbability', 0.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('impliedProbability', 0.99).should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('impliedProbability', -1.0); }).to.throw(Error);
    expect(function() { oddslib.from('impliedProbability', 0.0); }).to.throw(Error);
    expect(function() { oddslib.from('impliedProbability', 1.0); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('impliedProbability', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('impliedProbability', '-'); }).to.throw(Error);
  });
});

describe('Malay odds', function() {
  it('can be constructed', function() {
    oddslib.from('malay', 0.2).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('malay', -0.4).to('decimal').should.equal(3.5);
    oddslib.from('malay', '-0.4').to('decimal').should.equal(3.5);
    oddslib.from('malay', 0.75).to('decimal').should.equal(1.75);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.1).to('malay').should.equal(0.1);
    oddslib.from('decimal', 2.0).to('malay').should.equal(1.0);
    oddslib.from('moneyline', 400).to('malay').should.equal(-0.25);
  });

  it('throws an error when outside range', function() {
    // valid range: -1 < x <= 1.0
    oddslib.from('malay', -0.99).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('malay', 0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('malay', 0.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('malay', 1.0).should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('malay', -1.0); }).to.throw(Error);
    expect(function() { oddslib.from('malay', 1.01); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('malay', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('malay', '-'); }).to.throw(Error);
  });
});

describe('Indonesian odds', function() {
  it('can be constructed', function() {
    oddslib.from('indonesian', -5.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('indonesian', -5.0).to('decimal').should.equal(1.2);
    oddslib.from('indonesian', 3.0).to('decimal').should.equal(4.0);
    oddslib.from('indonesian', '3.0').to('decimal').should.equal(4.0);
  });

  it('can be converted to', function() {
    oddslib.from('decimal', 1.1).to('indonesian').should.equal(-10.0);
    oddslib.from('decimal', 2.0).to('indonesian').should.equal(1.0);
    oddslib.from('moneyline', 400).to('indonesian').should.equal(4.00);
  });

  it('throws an error when outside range', function() {
    // valid range: x != 0
    oddslib.from('indonesian', -5).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('indonesian', -0.01).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('indonesian', 0.01).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('indonesian', 1.0).should.be.an.instanceof(oddslib.Odds);
    oddslib.from('indonesian', 5.0).should.be.an.instanceof(oddslib.Odds);

    expect(function() { oddslib.from('indonesian', 0.0); }).to.throw(Error);
  });

  it('throws an error when invalid odds are passed', function() {
    expect(function() { oddslib.from('indonesian', 'foo'); }).to.throw(Error);
    expect(function() { oddslib.from('indonesian', '-'); }).to.throw(Error);
  });
});

describe('odds construction', function() {
  it('cannot be called manually', function() {
    expect(oddslib.Odds).to.throw(Error);
  });
});
