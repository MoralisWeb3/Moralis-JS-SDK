import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { GetPairReservesRequest, getPairReservesOperation } from './getPairReservesOperation';

describe('getPairReservesOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359';
    const chain = '0x10';
    const toDate = '2021-01-01T00:00:00.000Z';

    const request: Required<GetPairReservesRequest> = {
      chain: EvmChain.create(chain, core),
      toBlock: '123',
      toDate: new Date(toDate),
      pairAddress: EvmAddress.create(address),
    };

    const serializedRequest = getPairReservesOperation.serializeRequest(request, core);

    expect(serializedRequest.pairAddress).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.toDate).toBe(toDate);

    const deserializedRequest = getPairReservesOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.pairAddress as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect((deserializedRequest.toDate as Date | undefined)?.toISOString()).toBe(toDate);
  });
});
