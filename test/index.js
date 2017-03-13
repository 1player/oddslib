var should = require('chai').should(),
    expect = require('chai').expect;

var oddslib = require('../oddslib');

describe('odds', function() {
  it('cannot be constructed manually', function() {
    expect(oddslib.Odds).to.throw(Error);
  });

  // From/to decimal/EU
  it('can be constructed from decimal/EU odds', function() {
    oddslib.fromDecimal(1.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromDecimal(1.5).toDecimal().should.equal(1.5);
  });

  it('can be converted to decimal/EU odds', function() {
    oddslib.fromDecimal(1.5).toDecimal().should.equal(1.5);
  });

  // From/to American/Moneyline
  it('can be constructed from Moneyline odds', function() {
    oddslib.fromMoneyline(-500).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromMoneyline(-500).toDecimal().should.equal(1.20);
    oddslib.fromMoneyline(500).toDecimal().should.equal(6.00);
  });

  it('can be converted to Moneyline odds', function() {
    oddslib.fromDecimal(1.8).toMoneyline().should.equal(-125);
    oddslib.fromDecimal(4.5).toMoneyline().should.equal(350);
  });

  // From/to Hong Kong
  it('can be constructed from Hong Kong odds', function() {
    oddslib.fromHongKong(0.2).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromHongKong(0.2).toDecimal().should.equal(1.20);
  });

  it('can be converted to Hong Kong odds', function() {
    oddslib.fromDecimal(1.2).toHongKong().should.equal(0.20);
    oddslib.fromDecimal(11.76).toHongKong().should.equal(10.76);
  });

  // From/to implied probability
  it('can be constructed from implied probability', function() {
    oddslib.fromImpliedProbability(0.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromImpliedProbability(0.5).toDecimal().should.equal(2.00);
  });

  it('can be converted to implied probability', function() {
    oddslib.fromDecimal(1.60).toImpliedProbability().should.equal(0.625);
    oddslib.fromDecimal(2.50).toImpliedProbability().should.equal(0.4);
    oddslib.fromDecimal(1).toImpliedProbability().should.equal(1);
  });

  // From/to UK/fractional
  it('can be constructed from UK/fractional odds', function() {
    oddslib.fromFractional(5, 2).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromFractional(5, 2).toDecimal().should.equal(3.50);
  });

  it('can be converted to UK/fractional odds', function() {
    oddslib.fromDecimal(1.40).toFractional().should.equal("2/5");
    oddslib.fromDecimal(3.50).toFractional().should.equal("5/2");
    oddslib.fromDecimal(2).toFractional().should.equal("1/1");
  });
});
