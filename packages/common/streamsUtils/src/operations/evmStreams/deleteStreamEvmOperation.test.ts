import { Core } from '@moralisweb3/common-core';
import { deleteStreamEvmOperation, DeleteStreamEvmRequest } from './deleteStreamEvmOperation';

describe('deleteStreamEvmOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<DeleteStreamEvmRequest> = {
      id: '1234',
    };

    const serializedRequest = deleteStreamEvmOperation.serializeRequest(request, core);

    expect(serializedRequest.id).toBe('1234');

    const deserializedRequest = deleteStreamEvmOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.id).toBe('1234');
  });
});
