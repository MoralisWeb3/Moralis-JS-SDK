import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { GetContractEventsRequest, getContractEventsOperation } from './getContractEventsOperation';

describe('getContractEventsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359';
    const chain = '0x10';
    const toDate = '2021-01-01T00:00:00.000Z';
    const fromDate = '2020-01-01T00:00:00.000Z';

    const request: Required<GetContractEventsRequest> = {
      chain: EvmChain.create(chain, core),
      toBlock: 123,
      fromBlock: 123,
      abi: {
        anonymous: true,
        name: 'Transfer',
        type: 'event',
        inputs: [
          /* ... */
        ],
      },
      toDate: new Date(toDate),
      fromDate: new Date(fromDate),
      address: EvmAddress.create(address, core),
      subdomain: 'subdomain',
      limit: 100,
      offset: 0,
      topic: 'topic0',
      providerUrl: 'https://provider.com/url',
    };

    const serializedRequest = getContractEventsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.subdomain).toBe(request.subdomain);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.offset).toBe(request.offset);
    expect(serializedRequest.topic).toBe(request.topic);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.fromDate).toBe(fromDate);
    expect(serializedRequest.toDate).toBe(toDate);
    expect(serializedRequest.abi).toBe(request.abi);

    const deserializedRequest = getContractEventsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).lowercase).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect((deserializedRequest.fromDate as Date | undefined)?.toISOString()).toBe(fromDate);
    expect((deserializedRequest.toDate as Date | undefined)?.toISOString()).toBe(toDate);
    expect(deserializedRequest.providerUrl).toBe(request.providerUrl);
    expect(deserializedRequest.subdomain).toBe(request.subdomain);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect(deserializedRequest.offset).toBe(request.offset);
    expect(deserializedRequest.topic).toBe(request.topic);
    expect(deserializedRequest.abi).toBe(request.abi);
  });
});
