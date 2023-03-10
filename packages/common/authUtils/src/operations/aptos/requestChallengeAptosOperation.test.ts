import MoralisCore from '@moralisweb3/common-core';
import { AptosAddress, AptosNetwork } from '@moralisweb3/common-aptos-utils';
import { requestChallengeAptosOperation, RequestChallengeAptosRequest } from './requestChallengeAptosOperation';

describe('aptosRequestChallengeOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = 'mainnet';
    const expirationTime = '2021-01-01T00:00:00.000Z';
    const notBefore = '2020-01-01T00:00:00.000Z';

    const request: Required<RequestChallengeAptosRequest> = {
      address: AptosAddress.create(address),
      publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
      domain: 'defi.finance',
      chainId: AptosNetwork.create(chain),
      statement: 'VALID_RESPONSE',
      uri: 'https://defi.finance/',
      expirationTime: new Date(expirationTime),
      notBefore: new Date(notBefore),
      resources: ['https://docs.moralis.io/'],
      timeout: 50,
    };

    const serializedRequest = requestChallengeAptosOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe('0x000000000000000000000000fB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
    expect(serializedRequest.chainId).toBe(chain);
    expect(serializedRequest.domain).toBe(request.domain);
    expect(serializedRequest.statement).toBe(request.statement);
    expect(serializedRequest.uri).toBe(request.uri);
    expect(serializedRequest.expirationTime).toBe(request.expirationTime);
    expect(serializedRequest.notBefore).toBe(request.notBefore);
    expect(serializedRequest.resources).toBe(request.resources);
    expect(serializedRequest.timeout).toBe(request.timeout);

    const deserializedRequest = requestChallengeAptosOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as AptosAddress).toString()).toBe(
      '0x000000000000000000000000fB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
    );
    expect((deserializedRequest.chainId as AptosNetwork).toString()).toBe(chain);
    expect(deserializedRequest.domain).toBe(request.domain);
    expect(deserializedRequest.statement).toBe(request.statement);
    expect(deserializedRequest.uri).toBe(request.uri);
    expect(deserializedRequest.expirationTime).toBe(request.expirationTime);
    expect(deserializedRequest.notBefore).toBe(request.notBefore);
    expect(deserializedRequest.resources).toBe(request.resources);
    expect(deserializedRequest.timeout).toBe(request.timeout);
  });
});
