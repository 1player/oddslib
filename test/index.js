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

  // From/to American
  it('can be constructed from American odds', function() {
    oddslib.fromAmerican(-500).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromAmerican(-500).toDecimal().should.equal(1.20);
    oddslib.fromAmerican(500).toDecimal().should.equal(6.00);
  });

  it('can be converted to American odds', function() {
    oddslib.fromDecimal(1.8).toAmerican().should.equal(-125);
    oddslib.fromDecimal(4.5).toAmerican().should.equal(350);
  });

  // From/to Hong Kong
  it('can be constructed from Hong Kong odds', function() {
    oddslib.fromHongKong(0.2).should.be.an.instanceof(oddslib.Odds);
    oddslib.fromHongKong(0.2).toDecimal().should.equal(1.20);
  });

  it('can be converted to HongKong odds', function() {
    oddslib.fromDecimal(1.2).toHongKong().should.equal(0.20);
    oddslib.fromDecimal(11.76).toHongKong().should.equal(10.76);
  });
});
