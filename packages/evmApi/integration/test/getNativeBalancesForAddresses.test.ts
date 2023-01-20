import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNativeBalancesForAddresses', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the native balances of several accounts', async () => {
    const result = await evmApi.balance.getNativeBalancesForAddresses({
      walletAddresses: ['0x7dE3085b3190B3a787822Ee16F23be010f5F8686', '0xE92d1A43df510F82C66382592a047d288f85226f'],
    });

    expect(result).toBeDefined();
    expect(result.result.length).toBe(1);

    const nativeBalance = result.result[0];
    expect(nativeBalance.blockNumber).toBe('16435704');
    expect(nativeBalance.blockTimestamp).toBe('1674069191');
    expect(nativeBalance.chain.hex).toBe('0x1');
    expect(nativeBalance.totalBalance.toString()).toBe('450118365610976663088772');

    expect(nativeBalance.walletBalances.length).toBe(2);
    const firstAddressBalance = nativeBalance.walletBalances[0];
    expect(firstAddressBalance.address.checksum).toBe('0x7dE3085b3190B3a787822Ee16F23be010f5F8686');
    expect(firstAddressBalance.balance.toString()).toBe('39600000000000000');
  });

  it('should return an error code for an invalid address', async () => {
    expect(
      evmApi.balance.getNativeBalancesForAddresses({
        walletAddresses: ['0x7dE3085b3190B3a787822Ee16F23be010f5F868', '0xE92d1A43df510F82C66382592a047d288f85226f'],
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
