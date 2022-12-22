import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getTokenPriceOperation, GetTokenPriceRequest } from './getTokenPriceOperation';

describe('getTokenPriceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetTokenPriceRequest> = {
      address: EvmAddress.create(address, core),
      chain: EvmChain.create(chain, core),
      exchange: 'pancakeswapv2',
      toBlock: 20,
    };

    const serializedRequest = getTokenPriceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.exchange).toBe(request.exchange);
    expect(serializedRequest.toBlock).toBe(request.toBlock);

    const deserializedRequest = getTokenPriceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.exchange).toBe(request.exchange);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
  });
});
