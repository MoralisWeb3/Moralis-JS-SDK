import MoralisCore from '@moralisweb3/common-core';
import { getStreamEvmOperation, GetStreamEvmRequest } from './getStreamEvmOperation';

describe('getStreamEvmOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {

    const request: Required<GetStreamEvmRequest> = {
      id: 'stream-1',
    };

    const serializedRequest = getStreamEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);

    const deserializedRequest = getStreamEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
  });
});
