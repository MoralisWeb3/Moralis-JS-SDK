import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

const ABI = {
  anonymous: false,
  inputs: [
    { indexed: true, name: 'from', type: 'address' },
    { indexed: true, name: 'to', type: 'address' },
    { indexed: false, name: 'value', type: 'uint256' },
  ],
  name: 'Transfer',
  type: 'event',
};

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen({ onUnhandledRequest: 'warn' });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the events of an account address', async () => {
    const result = await EvmApi.native.getContractEvents({
      chain: 'eth',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      limit: 3,
      abi: ABI,
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw.total).toBe(149352579);
  });

  it('should not get the events and return an error code for an invalid address', () => {
    expect(
      EvmApi.native.getContractEvents({
        chain: 'eth',
        address: '0xdAC17F958D',
        topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        limit: 3,
        abi: ABI,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
