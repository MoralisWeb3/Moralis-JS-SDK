import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { GetNativeBalanceRequest, getNativeBalanceOperation } from './getNativeBalanceOperation';

describe('getNativeBalanceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNativeBalanceRequest> = {
      address: EvmAddress.create(address, core),
      chain: EvmChain.create(chain, core),
      toBlock: 123,
      providerUrl: 'https://provider.com/url',
    };

    const serializedRequest = getNativeBalanceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);

    const deserializedRequest = getNativeBalanceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.providerUrl).toBe(request.providerUrl);
  });
});
