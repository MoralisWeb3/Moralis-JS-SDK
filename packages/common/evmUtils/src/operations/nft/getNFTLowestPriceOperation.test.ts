import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import {
  getNftLowestPriceOperation,
  GetNftLowestPriceRequest,
} from './getNFTLowestPriceOperation';

describe('getNftLowestPriceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNftLowestPriceRequest> = {
      chain: EvmChain.create(chain, core),
      providerUrl: 'https://provider.com/url',
      address: EvmAddress.create(address, core),
      days: 7,
      marketplace: 'opensea',
    };

    const serializedRequest = getNftLowestPriceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.days).toBe(request.days);
    expect(serializedRequest.marketplace).toBe(request.marketplace);

    const deserializedRequest = getNftLowestPriceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.providerUrl).toBe(request.providerUrl);
    expect(deserializedRequest.days).toBe(request.days);
    expect(deserializedRequest.marketplace).toBe(request.marketplace);
  });
});
