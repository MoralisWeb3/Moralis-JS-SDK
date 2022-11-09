import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getTokenMetadataOperation, GetTokenMetadataRequest } from './getTokenMetadataOperation';

describe('getTokenMetadataOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const addresses = ['0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'];
    const chain = '0x10';

    const request: Required<GetTokenMetadataRequest> = {
      addresses: addresses.map((address) => EvmAddress.create(address, core)),
      chain: EvmChain.create(chain, core),
      providerUrl: 'https://provider.com/url',
      subdomain: 'my-domain.com',
    };

    const serializedRequest = getTokenMetadataOperation.serializeRequest(request, core);

    expect(serializedRequest.addresses[0]).toBe(addresses[0]);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.subdomain).toBe(request.subdomain);

    const deserializedRequest = getTokenMetadataOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.addresses as EvmAddress[])[0].checksum).toBe(addresses[0]);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.providerUrl).toBe(request.providerUrl);
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
  });
});
