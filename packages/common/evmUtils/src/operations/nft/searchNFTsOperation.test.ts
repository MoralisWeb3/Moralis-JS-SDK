import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { searchNfTsOperation, SearchNfTsRequest } from './searchNFTsOperation';

describe('searchNfTsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const chain = '0x10';
    const addresses = ['0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1'];

    const request: Required<SearchNfTsRequest> = {
      chain: EvmChain.create(chain, core),
      addresses: addresses.map((address) => EvmAddress.create(address, core)),
      q: 'Pancake',
      filter: 'name',
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
      fromBlock: 10,
      toBlock: 20,
      fromDate: '2000-12-20',
      toDate: '2000-12-25',
    };

    const serializedRequest = searchNfTsOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.addresses?.length).toBe(request.addresses.length);
    for (let i = 0; i < request.addresses.length; i++) {
      expect((serializedRequest.addresses ?? [])[i]).toBe(addresses[i]);
    }
    expect(serializedRequest.q).toBe(request.q);
    expect(serializedRequest.filter).toBe(request.filter);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.fromDate).toBe(request.fromDate);
    expect(serializedRequest.toDate).toBe(request.toDate);

    const deserializedRequest = searchNfTsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.addresses?.length).toBe(request.addresses.length);
    for (let i = 0; i < request.addresses.length; i++) {
      const tokenAddress = (deserializedRequest.addresses ?? [])[i];
      const requestAddress = request.addresses[i];
      expect(EvmAddress.equals(tokenAddress, requestAddress)).toBeTruthy();
    }
    expect(deserializedRequest.q).toBe(request.q);
    expect(deserializedRequest.filter).toBe(request.filter);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.fromDate).toBe(request.fromDate);
    expect(deserializedRequest.toDate).toBe(request.toDate);
  });
});
