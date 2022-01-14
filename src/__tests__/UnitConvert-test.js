jest.dontMock('ethers');
jest.dontMock('../UnitConvert');

const Units = require('../UnitConvert');

describe('UnitCovert', () => {
  it('ETH', () => {
    expect(Units.ETH(1)).toEqual('1000000000000000000');
    expect(Units.ETH(2)).toEqual('2000000000000000000');
    expect(Units.ETH(0.5)).toEqual('500000000000000000');
    expect(Units.ETH('2')).toEqual('2000000000000000000');
    expect(Units.ETH('123.111111111111111111')).toEqual('123111111111111111111');

    expect(() => Units.ETH('123.1111111111111111111')).toThrow();
  });
  it('Token', () => {
    expect(Units.Token(1, 18)).toEqual('1000000000000000000');
    expect(Units.Token(1)).toEqual('1000000000000000000');
    expect(Units.Token('3', 18)).toEqual('3000000000000000000');
    expect(Units.Token(3, 0)).toEqual('3');
    expect(Units.Token(9.9, 1)).toEqual('99');
    expect(Units.Token(123.456, 3)).toEqual('123456');
    expect(Units.Token(0, 0)).toEqual('0');

    // Floating percision regression tests
    expect(Units.Token(16.9183, 18)).toEqual('16918300000000000000');
    expect(Units.Token(315553.17, 2)).toEqual('31555317');
    expect(Units.Token(315553.16, 2)).toEqual('31555316');

    expect(() => Units.Token(315553.16, 1)).toThrow();
  });
  it('FromWei', () => {
    expect(Units.FromWei('1000000000000000000', 18)).toEqual('1');
    expect(Units.FromWei('2000000000000000000')).toEqual('2');
    expect(Units.FromWei(123456789, 0)).toEqual('123456789');
    expect(Units.FromWei('123456789', 0)).toEqual('123456789');
    expect(Units.FromWei(123456789, 3)).toEqual('123456.789');
    expect(Units.FromWei(123456789, 9)).toEqual('0.123456789');
    expect(Units.FromWei(123456789, 12)).toEqual('0.000123456789');
    expect(Units.FromWei(30000000, 5)).toEqual('300');
    expect(Units.FromWei(20, 0)).toEqual('20');

    expect(() => Units.FromWei('0.5', 0)).toThrow();
  });
});
