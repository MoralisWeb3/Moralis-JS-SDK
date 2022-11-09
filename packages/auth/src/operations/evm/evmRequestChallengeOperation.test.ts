import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { evmRequestChallengeOperation, EvmRequestChallengeRequest } from './evmRequestChallengeOperation';

describe('evmRequestChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '25';
    const expirationTime = '2021-01-01T00:00:00.000Z';
    const notBefore = '2020-01-01T00:00:00.000Z';

    const request: Required<EvmRequestChallengeRequest> = {
      address: EvmAddress.create(address, core),
      domain: 'defi.finance',
      chainId: EvmChain.create(chain, core),
      statement: 'VALID_RESPONSE',
      uri: 'https://defi.finance/',
      expirationTime: new Date(expirationTime),
      notBefore: new Date(notBefore),
      resources: ['https://docs.moralis.io/'],
      timeout: 50,
    };

    const serializedRequest = evmRequestChallengeOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chainId).toBe(chain);
    expect(serializedRequest.domain).toBe(request.domain);
    expect(serializedRequest.statement).toBe(request.statement);
    expect(serializedRequest.uri).toBe(request.uri);
    expect(serializedRequest.expirationTime).toBe(request.expirationTime);
    expect(serializedRequest.notBefore).toBe(request.notBefore);
    expect(serializedRequest.resources).toBe(request.resources);
    expect(serializedRequest.timeout).toBe(request.timeout);

    const deserializedRequest = evmRequestChallengeOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chainId as EvmChain).decimal.toString()).toBe(chain);
    expect(deserializedRequest.domain).toBe(request.domain);
    expect(deserializedRequest.statement).toBe(request.statement);
    expect(deserializedRequest.uri).toBe(request.uri);
    expect(deserializedRequest.expirationTime).toBe(request.expirationTime);
    expect(deserializedRequest.notBefore).toBe(request.notBefore);
    expect(deserializedRequest.resources).toBe(request.resources);
    expect(deserializedRequest.timeout).toBe(request.timeout);
  });
});
