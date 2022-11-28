import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { GetPairAddressRequest, getPairAddressOperation } from './getPairAddressOperation';

describe('getPairAddressOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359';
    const chain = '0x10';
    const toDate = '2021-01-01T00:00:00.000Z';

    const request: Required<GetPairAddressRequest> = {
      chain: EvmChain.create(chain, core),
      toBlock: '123',
      toDate: new Date(toDate),
      exchange: 'pancakeswapv2',
      token0Address: EvmAddress.create(address, core),
      token1Address: EvmAddress.create(address, core),
    };

    const serializedRequest = getPairAddressOperation.serializeRequest(request, core);

    expect(serializedRequest.token0Address).toBe(address);
    expect(serializedRequest.token1Address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.exchange).toBe(request.exchange);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.toDate).toBe(toDate);

    const deserializedRequest = getPairAddressOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.token0Address as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.token1Address as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect((deserializedRequest.toDate as Date | undefined)?.toISOString()).toBe(toDate);
    expect(deserializedRequest.exchange).toBe(request.exchange);
  });
});
