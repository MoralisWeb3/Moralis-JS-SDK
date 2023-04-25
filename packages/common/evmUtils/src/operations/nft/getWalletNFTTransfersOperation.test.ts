import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletNFTTransfersOperation, GetWalletNFTTransfersRequest } from './getWalletNFTTransfersOperation';

describe('getWalletNFTTransfersOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetWalletNFTTransfersRequest> = {
      chain: EvmChain.create(chain),
      address: EvmAddress.create(address),
      format: 'decimal',
      direction: 'from',
      fromBlock: 123,
      toBlock: '123',
      limit: 100,
      cursor: 'CURSOR1',
      disableTotal: true,
    };

    const serializedRequest = getWalletNFTTransfersOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.direction).toBe(request.direction);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getWalletNFTTransfersOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.direction).toBe(request.direction);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
