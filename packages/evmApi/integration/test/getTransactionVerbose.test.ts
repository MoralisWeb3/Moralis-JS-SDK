import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getTransactionVerbose', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.transaction.getTransactionVerbose({
      transactionHash: '0x4044044044044044044044044044044044044044044044044044044044044040',
      chain: '0x5',
    });

    expect(response).toBeNull();
  });

  it('returns null when API returns false-positive not found', async () => {
    const response = await evmApi.transaction.getTransactionVerbose({
      transactionHash: '0x2000000000000000000000000000040440440440440440440440440440440440',
      chain: '0x5',
    });

    expect(response).toBeNull();
  });

  it('returns properly transaction', async () => {
    const response = await evmApi.transaction.getTransactionVerbose({
      transactionHash: '0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff',
      chain: '0x5',
    });
    const result = response!.result;
    const log = result.logs[0];

    // Check default transaction data
    expect(result).toBeDefined();
    expect(result.hash).toEqual('0xb796997765a2274d26df7ded20536e5fb9d53e56562d3cb0fbe867d695e3f2ff');
    expect(result.nonce?.toString()).toEqual('384698');
    expect(result.gas?.toString()).toEqual('100000');
    expect(result.gasPrice?.toString()).toEqual('14459046318');

    // Check verbose transaction data
    expect(result.decodedCall.signature).toBe('transfer(address,uint256)');
    expect(result.decodedCall.label).toBe('transfer');
    expect(result.decodedCall.type).toBe('function');
    expect(result.decodedCall.params).toStrictEqual([
      {
        name: '_to',
        value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
        type: 'address',
      },
      {
        name: '_value',
        value: '78136438',
        type: 'uint256',
      },
    ]);
    expect(log).toBeDefined();
    expect(log.decodedEvent.signature).toBe('Transfer(address,address,uint256)');
    expect(log.decodedEvent.label).toBe('Transfer');
    expect(log.decodedEvent.type).toBe('event');
    expect(log.decodedEvent.params).toStrictEqual([
      {
        name: 'from',
        value: '0x292f04a44506c2fd49Bac032E1ca148C35A478c8',
        type: 'address',
      },
      {
        name: 'to',
        value: '0x41aeB05a21F9A30Fc545Ad883AF37dF096354B7c',
        type: 'address',
      },
      {
        name: 'value',
        value: '78136438',
        type: 'uint256',
      },
    ]);
  });
});
