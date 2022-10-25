import { BigNumber } from '@moralisweb3/core';
import { setupEvmUtils } from '../../test/setup';
import { Erc20Token } from '../Erc20/Erc20';
import { Erc20Value } from './Erc20Value';

const makeTestToken = (
  options: {
    decimals?: number;
    chain?: string;
    name?: string;
    symbol?: string;
    contractAddress?: string;
  } = {},
) => {
  const contractAddress = options.contractAddress ?? '0x0000000000000000000000000000000000000123';
  const symbol = options.symbol ?? 'TEST';
  const name = options.name ?? 'Test Token';
  const decimals = options.decimals ?? 18;
  const chain = options.chain ?? '0x1';

  const token = Erc20Token.create({
    chain: chain,
    contractAddress: contractAddress,
    decimals: decimals,
    symbol: symbol,
    name: name,
  });

  return {
    token,
    contractAddress,
    symbol,
    name,
    decimals,
    chain,
  };
};
describe('Erc20Value', () => {
  beforeAll(() => {
    setupEvmUtils();
  });

  describe('create', () => {
    it('creates without decimals', () => {
      const erc20Value = Erc20Value.create(1000);

      expect(erc20Value.decimals).toBe(18);
    });

    it('creates with decimals', () => {
      const erc20Value = Erc20Value.create(1000, { decimals: 10 });

      expect(erc20Value.decimals).toBe(10);
    });

    it('creates based on a number', () => {
      const erc20Value = Erc20Value.create(123);

      expect(erc20Value.amount.toString()).toBe('123');
    });

    it('creates based on a string', () => {
      const erc20Value = Erc20Value.create('123');

      expect(erc20Value.amount.toString()).toBe('123');
    });

    it('creates based on a big number string', () => {
      const erc20Value = Erc20Value.create('10000000000000000');

      expect(erc20Value.amount.toString()).toBe('10000000000000000');
    });

    it('creates based on a BigNumber', () => {
      const erc20Value = Erc20Value.create(BigNumber.create('10000000000000000'));

      expect(erc20Value.amount.toString()).toBe('10000000000000000');
    });

    it('creates a value with associated token', () => {
      const { token, contractAddress, symbol, name, decimals, chain } = makeTestToken();
      const erc20Value = Erc20Value.create('10000000000000000', { token });

      expect(erc20Value.token?.contractAddress.equals(contractAddress)).toBe(true);
      expect(erc20Value.token?.symbol).toBe(symbol);
      expect(erc20Value.token?.name).toBe(name);
      expect(erc20Value.token?.decimals).toBe(decimals);
      expect(erc20Value.token?.chain.equals(chain)).toBe(true);
    });

    it('creates a value with associated token', () => {
      const { token, contractAddress, symbol, name, decimals, chain } = makeTestToken();
      const erc20Value = Erc20Value.create('10000000000000000', { token });

      expect(erc20Value.token?.contractAddress.equals(contractAddress)).toBe(true);
      expect(erc20Value.token?.symbol).toBe(symbol);
      expect(erc20Value.token?.name).toBe(name);
      expect(erc20Value.token?.decimals).toBe(decimals);
      expect(erc20Value.token?.chain.equals(chain)).toBe(true);
    });

    it('fails to create a token with associated token that has different decimals', () => {
      const { token } = makeTestToken({ decimals: 12 });
      expect(() => Erc20Value.create('10000000000000000', { token, decimals: 13 })).toThrowErrorMatchingInlineSnapshot(
        `"[C0016] Decimals do not match"`,
      );
    });
  });

  describe('format', () => {
    const tokenValue = Erc20Value.create(123456780000, { decimals: 10 });

    it('formats the value to a correct string', () => {
      expect(tokenValue.value).toBe('12.345678');
    });

    it('formats via toString() to a correct string', () => {
      expect(tokenValue.toString()).toBe('12.345678');
    });

    it('formats via format() to a correct string', () => {
      expect(tokenValue.format()).toBe('12.345678');
    });

    it('formats to number', () => {
      expect(tokenValue.toNumber()).toBe(12.345678);
    });

    it('returns value in an object on toJSON()', () => {
      expect(tokenValue.toJSON()).toStrictEqual({ value: '12.345678' });
    });

    it('returns value and token data in an object on toJSON() when an token is associated', () => {
      const { token } = makeTestToken({ decimals: 10 });
      const tokenValueWithToken = Erc20Value.create(123456780000, { decimals: 10, token });

      expect(tokenValueWithToken.toJSON()).toStrictEqual({
        value: '12.345678',
        token: {
          chain: '0x1',
          contractAddress: '0x0000000000000000000000000000000000000123',
          decimals: 10,
          name: 'Test Token',
          symbol: 'TEST',
          logo: undefined,
          logoHash: undefined,
          thumbnail: undefined,
        },
      });
    });

    it('formats a readable string with token, when a token is provided', () => {
      const { token, symbol } = makeTestToken({ decimals: 10 });
      const tokenValueWithToken = Erc20Value.create(123456780000, { decimals: 10, token });

      expect(tokenValueWithToken.display()).toBe(`12.345678 ${symbol}`);
    });

    it('throws an error when trying to call display without a token', () => {
      const tokenValueWithToken = Erc20Value.create(123456780000, { decimals: 10 });

      expect(tokenValueWithToken.display()).toBe(`12.345678`);
    });
  });

  describe('equals', () => {
    const tokenA = Erc20Value.create('12345678000', { decimals: 18 });
    // Same value as tokenA (just different decimals)
    const tokenB = Erc20Value.create('123456780000', { decimals: 19 });
    // Different value as tokenA
    const tokenC = Erc20Value.create('223456780000', { decimals: 18 });

    it('should pass equallity with the same token', () => {
      expect(tokenA.equals(tokenA)).toBe(true);
    });

    it('should pass equallity a number input', () => {
      expect(tokenA.equals(12345678000)).toBe(true);
    });

    it('should pass equallity a string input', () => {
      expect(tokenA.equals('12345678000')).toBe(true);
    });

    it('should pass BigNumber a string input', () => {
      expect(tokenA.equals(BigNumber.create('12345678000'))).toBe(true);
    });

    it('should pass with the same value', () => {
      expect(tokenA.equals(tokenB)).toBe(true);
    });

    it('should fail with a different value', () => {
      expect(tokenA.equals(tokenC)).toBe(false);
    });
  });
});
