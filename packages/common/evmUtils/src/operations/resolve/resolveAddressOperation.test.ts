import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress } from '../../dataTypes';
import { resolveAddressOperation, ResolveAddressRequest } from './resolveAddressOperation';

describe('resolveAddressOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';

    const request: Required<ResolveAddressRequest> = {
      address: EvmAddress.create(address, core),
    };

    const serializedRequest = resolveAddressOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);

    const deserializedRequest = resolveAddressOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
  });
});
