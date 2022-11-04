import MoralisCore from '@moralisweb3/common-core';
import { resolveDomainOperation, ResolveDomainRequest } from './resolveDomainOperation';

describe('resolveDomainOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const request: Required<ResolveDomainRequest> = {
      domain: 'defi.crypto',
      currency: 'eth',
    };

    const serializedRequest = resolveDomainOperation.serializeRequest(request, core);

    expect(serializedRequest.domain).toBe(request.domain);
    expect(serializedRequest.currency).toBe(request.currency);

    const deserializedRequest = resolveDomainOperation.deserializeRequest(serializedRequest, core);

    expect(deserializedRequest.domain).toBe(request.domain);
    expect(deserializedRequest.currency).toBe(request.currency);
  });
});
