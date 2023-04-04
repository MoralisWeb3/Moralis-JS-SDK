import MoralisCore from '@moralisweb3/common-core';
import { resolveENSDomainOperation, ResolveENSDomainJSONRequest } from './resolveENSDomainOperation';

describe('resolveENSDomainOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<ResolveENSDomainJSONRequest> = {
      domain: 'nick.eth',
    };

    const serializedRequest = resolveENSDomainOperation.serializeRequest(request, core);

    expect(serializedRequest.domain).toBe(request.domain);

    const deserializedRequest = resolveENSDomainOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.domain).toBe(request.domain);
  });
});
