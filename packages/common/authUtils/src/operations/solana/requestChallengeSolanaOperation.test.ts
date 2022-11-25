import MoralisCore from '@moralisweb3/common-core';
import { SolAddress, SolNetwork } from '@moralisweb3/common-sol-utils';
import { requestChallengeSolanaOperation, RequestChallengeSolanaRequest } from './requestChallengeSolanaOperation';

describe('solRequestChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU';
    const network = 'mainnet';
    const expirationTime = '2021-01-01T00:00:00.000Z';
    const notBefore = '2020-01-01T00:00:00.000Z';

    const request: Required<RequestChallengeSolanaRequest> = {
      address: SolAddress.create(address),
      domain: 'defi.finance',
      network: SolNetwork.create(network),
      statement: 'VALID_RESPONSE',
      uri: 'https://defi.finance/',
      expirationTime: new Date(expirationTime),
      notBefore: new Date(notBefore),
      resources: ['https://docs.moralis.io/'],
      timeout: 50,
    };

    const serializedRequest = requestChallengeSolanaOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.network).toBe(network);
    expect(serializedRequest.domain).toBe(request.domain);
    expect(serializedRequest.statement).toBe(request.statement);
    expect(serializedRequest.uri).toBe(request.uri);
    expect(serializedRequest.expirationTime).toBe(request.expirationTime);
    expect(serializedRequest.notBefore).toBe(request.notBefore);
    expect(serializedRequest.resources).toBe(request.resources);
    expect(serializedRequest.timeout).toBe(request.timeout);

    const deserializedRequest = requestChallengeSolanaOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as SolAddress).address).toBe(address);
    expect((deserializedRequest.network as SolNetwork).network).toBe(network);
    expect(deserializedRequest.domain).toBe(request.domain);
    expect(deserializedRequest.statement).toBe(request.statement);
    expect(deserializedRequest.uri).toBe(request.uri);
    expect(deserializedRequest.expirationTime).toBe(request.expirationTime);
    expect(deserializedRequest.notBefore).toBe(request.notBefore);
    expect(deserializedRequest.resources).toBe(request.resources);
    expect(deserializedRequest.timeout).toBe(request.timeout);
  });
});
