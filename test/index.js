var should = require('chai').should(),
    expect = require('chai').expect;

var oddslib = require('../oddslib');

describe('odds construction', function() {
  it('cannot be called manually', function() {
    expect(oddslib.Odds).to.throw(Error);
  });

  it('supports decimal/EU odds', function() {
    oddslib.fromDecimal(1.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromDecimal(1.5).toDecimal().should.equal(1.5);
  });

  it('supports Moneyline odds', function() {
    oddslib.fromMoneyline(-500).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromMoneyline(-500).toDecimal().should.equal(1.20);
    oddslib.fromMoneyline(500).toDecimal().should.equal(6.00);
  });

  it('supports Hong Kong odds', function() {
    oddslib.fromHongKong(0.2).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromHongKong(0.2).toDecimal().should.equal(1.20);
  });

  it('supports UK/fractional odds', function() {
    oddslib.fromFractional(5, 2).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromFractional(5, 2).toDecimal().should.equal(3.50);
  });

  it('supports implied probability', function() {
    oddslib.fromImpliedProbability(0.5).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromImpliedProbability(0.5).toDecimal().should.equal(2.00);
  });

});

describe('odds conversion', function() {
  it('supports decimal/EU odds', function() {
    oddslib.fromDecimal(1.5).toDecimal().should.equal(1.5);
  });

  it('supports Moneyline odds', function() {
    oddslib.fromDecimal(1.8).toMoneyline().should.equal(-125);
    oddslib.fromDecimal(4.5).toMoneyline().should.equal(350);
  });

  it('supports Hong Kong odds', function() {
    oddslib.fromDecimal(1.2).toHongKong().should.equal(0.20);
    oddslib.fromDecimal(11.76).toHongKong().should.equal(10.76);
  });

  it('supports UK/fractional odds', function() {
    oddslib.fromDecimal(1.40).toFractional().should.equal("2/5");
    oddslib.fromDecimal(3.50).toFractional().should.equal("5/2");
    oddslib.fromDecimal(2).toFractional().should.equal("1/1");
  });

  it('supports implied probability', function() {
    oddslib.fromDecimal(1.60).toImpliedProbability().should.equal(0.625);
    oddslib.fromDecimal(2.50).toImpliedProbability().should.equal(0.4);
    oddslib.fromDecimal(1).toImpliedProbability().should.equal(1);
  });
});
