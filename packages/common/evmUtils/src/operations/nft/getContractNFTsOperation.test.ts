import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getContractNFTsOperation, GetContractNFTsRequest } from './getContractNFTsOperation';

describe('getContractNfTsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetContractNFTsRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address, core),
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
      range: 20,
      totalRanges: 10,
    };

    const serializedRequest = getContractNFTsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.range).toBe(request.range);
    expect(serializedRequest.totalRanges).toBe(request.totalRanges);

    const deserializedRequest = getContractNFTsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.range).toBe(request.range);
    expect(deserializedRequest.totalRanges).toBe(request.totalRanges);
  });
});
