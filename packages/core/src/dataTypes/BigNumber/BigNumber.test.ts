import { BigNumber } from './BigNumber';

describe('BigNumber', () => {
  it('from() returns integer', () => {
    const value = BigNumber.from('1000000000000000000');
    expect(value.toString()).toEqual('1000000000000000000');
    expect(value.toJSON()).toEqual('0x0de0b6b3a7640000');
    expect(value.toDecimal(0)).toEqual('1000000000000000000');
    expect(value.toDecimal(18)).toEqual('1.0');
    expect(value.toDecimal(5)).toEqual('10000000000000.0');
    expect(value.toBigInt()).toEqual(BigInt('1000000000000000000'));
  });

  it('fromDecimal() returns integer', () => {
    const value = BigNumber.fromDecimal('1.1', 18);
    expect(value.toString()).toEqual('1100000000000000000');
    expect(value.toJSON()).toEqual('0x0f43fc2c04ee0000');
    expect(value.toDecimal(0)).toEqual('1100000000000000000');
    expect(value.toDecimal(18)).toEqual('1.1');
    expect(value.toDecimal(5)).toEqual('11000000000000.0');
  });

  it('fromDecimal() assumes decimals=0 if not provided', () => {
    const value = BigNumber.fromDecimal(100);
    expect(value.toString()).toEqual('100');
  });

  it('does not create a new instance if BigNumber instance passed', () => {
    const value = BigNumber.from(0x1);
    expect(BigNumber.from(value) === value).toBe(true);
  });

  describe('math', () => {
    const from = (value: number) => BigNumber.from(value);

    it('add() multiplies correctly', () => {
      expect(from(2).add(from(3)).toString()).toEqual('5');
    });

    it('sub() subtracts correctly', () => {
      expect(from(10).sub(from(4)).toString()).toEqual('6');
    });

    it('mul() multiplies correctly', () => {
      expect(from(2).mul(from(3)).toString()).toEqual('6');
    });

    it('div() divides correctly', () => {
      expect(from(15).div(from(5)).toString()).toEqual('3');
    });

    it('eq() returns correct value', () => {
      expect(from(1).eq(from(1))).toBe(true);
      expect(from(1).eq(from(-1))).toBe(false);
    });
  });
});
