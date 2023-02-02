import MoralisCore from '@moralisweb3/common-core';
import { deleteStreamAptosOperation, DeleteStreamAptosRequest } from './deleteStreamAptosOperation';

describe('deleteStreamAptosOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<DeleteStreamAptosRequest> = {
      id: '773c61f9-1ff0-4ab4-b115-2ad8030066df',
    };

    const serializedRequest = deleteStreamAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe(request.id);

    const deserializedRequest = deleteStreamAptosOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe(request.id);
  });
});
