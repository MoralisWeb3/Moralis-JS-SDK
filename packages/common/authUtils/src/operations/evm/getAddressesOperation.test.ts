import MoralisCore from '@moralisweb3/common-core';
import { getAddressesOperation, GetAddressesRequest } from './getAddressesOperation';

describe('getAddressesOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetAddressesRequest> = {
      profileId: '0x0b2bbac1251651c0cbbdbbb29fed5a03adc8b05a2a9eb10a02aaa489b9c1f8ff',
    };

    const serializedRequest = getAddressesOperation.serializeRequest(request, core);

    expect(serializedRequest.profileId).toBe(request.profileId);

    const deserializedRequest = getAddressesOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.profileId).toBe(request.profileId);
  });
});
