import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getWalletTransactionsOperation, GetWalletTransactionsRequest } from './getWalletTransactionsOperation';

describe('getWalletTransactionsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';
    const fromDate = '2021-01-01T00:00:00.000Z';
    const toDate = '2021-01-01T00:00:00.000Z';

    const request: Required<GetWalletTransactionsRequest> = {
      address: EvmAddress.create(address, core),
      chain: EvmChain.create(chain, core),
      fromBlock: 10,
      toBlock: 20,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      cursor: 'CURSOR1',
      limit: 333,
      disableTotal: true,
      include: 'internal_transactions',
    };

    const serializedRequest = getWalletTransactionsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.fromDate).toBe(request.fromDate);
    expect(serializedRequest.toDate).toBe(request.toDate);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.disableTotal).toBe(true);

    const deserializedRequest = getWalletTransactionsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.fromDate).toBe(request.fromDate);
    expect(deserializedRequest.toDate).toBe(request.toDate);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.disableTotal).toBe(true);
  });
});
