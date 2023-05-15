import { Core } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { GetNativeBalanceRequest, getNativeBalanceOperation } from './getNativeBalanceOperation';

describe('getNativeBalanceOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNativeBalanceRequest> = {
      address: EvmAddress.create(address),
      chain: EvmChain.create(chain),
      toBlock: 123,
    };

    const serializedRequest = getNativeBalanceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.toBlock).toBe(request.toBlock);

    const deserializedRequest = getNativeBalanceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
  });
});
