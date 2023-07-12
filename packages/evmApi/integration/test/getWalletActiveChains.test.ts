import { EvmChain } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletActiveChains', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns result from the API', async () => {
    const result = await evmApi.wallets.getWalletActiveChains({
      address: '0x78605df79524164911c144801f41e9811b7db73d',
      chains: [EvmChain.ETHEREUM],
    });

    expect(result.result.address).toBe('0x78605df79524164911c144801f41e9811b7db73d');
    const ac0 = result.result.activeChains[0];
    expect(ac0.chain).toBe('eth');
    expect(ac0.chainId).toBe('0x1');
    expect(ac0.firstTransaction?.blockNumber.toHex()).toBe('0xc16d55');
    expect(ac0.firstTransaction?.transactionHash).toBe(
      '0xbf9bbdc096c8930de737c7e34fdd6d801419c1cd06579283336454a74e438333',
    );
    expect(ac0.firstTransaction?.blockTimestamp).toBe('2021-06-21T07:57:29.000Z');
    expect(ac0.lastTransaction?.blockNumber.toHex()).toBe('0x010d6613');
    expect(ac0.lastTransaction?.transactionHash).toBe(
      '0x827ee351ef48bab07f9330d3653d73355f82e5c9535d5887ff7e55e609079fca',
    );
    expect(ac0.lastTransaction?.blockTimestamp).toBe('2023-07-09T09:38:59.000Z');
  });
});
