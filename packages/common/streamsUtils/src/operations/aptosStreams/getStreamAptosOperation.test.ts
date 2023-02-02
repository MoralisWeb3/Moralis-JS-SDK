import MoralisCore from '@moralisweb3/common-core';
import { getStreamAptosOperation, GetStreamAptosRequest } from './getStreamAptosOperation';

describe('getStreamAptosOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<GetStreamAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
    };

    const serializedRequest = getStreamAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);

    const deserializedRequest = getStreamAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
  });
});
