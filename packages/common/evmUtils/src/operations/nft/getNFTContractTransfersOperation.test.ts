import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getNFTContractTransfersOperation, GetNFTContractTransfersRequest } from './getNFTContractTransfersOperation';

describe('getNftContractTransfersOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';
    const toDate = '2021-01-01T00:00:00.000Z';
    const fromDate = '2021-01-01T00:00:00.000Z';

    const request: Required<GetNFTContractTransfersRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address),
      format: 'decimal',
      limit: 100,
      cursor: 'CURSOR1',
      fromBlock: 16225000,
      toBlock: 16225608,
      toDate: new Date(toDate),
      fromDate: new Date(fromDate),
      disableTotal: true,
    };

    const serializedRequest = getNFTContractTransfersOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.format).toBe(request.format);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.fromDate).toBe(fromDate);
    expect(serializedRequest.toDate).toBe(toDate);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getNFTContractTransfersOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.format).toBe(request.format);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect((deserializedRequest.fromDate as Date | undefined)?.toISOString()).toBe(fromDate);
    expect((deserializedRequest.toDate as Date | undefined)?.toISOString()).toBe(toDate);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
