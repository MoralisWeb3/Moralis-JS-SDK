import MoralisCore from '@moralisweb3/common-core';
import { EvmChain } from '../../dataTypes';
import {
  getTokenMetadataBySymbolOperation,
  GetTokenMetadataBySymbolRequest,
} from './getTokenMetadataBySymbolOperation';

describe('getTokenMetadataBySymbolOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';

    const request: Required<GetTokenMetadataBySymbolRequest> = {
      chain: EvmChain.create(chain, core),
      subdomain: 'my-domain.com',
      symbols: ['SHIBA INU'],
    };

    const serializedRequest = getTokenMetadataBySymbolOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.subdomain).toBe(request.subdomain);
    expect(serializedRequest.symbols).toBe(request.symbols);

    const deserializedRequest = getTokenMetadataBySymbolOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
    expect(deserializedRequest.symbols).toBe(request.symbols);
  });
});
