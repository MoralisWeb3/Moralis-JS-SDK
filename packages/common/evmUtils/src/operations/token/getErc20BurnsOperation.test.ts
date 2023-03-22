import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getErc20MintsOperation, GetErc20MintsRequest } from './getErc20MintsOperation';

describe('getErc20MintsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const contractAddresses = '0xA1ec0345033E7817FB532F68ceb83cD43B05A867';
    const excludeContracts = '0x65d10A783486d778b036E4715ce69e504aC72536';
    const walletAddresses = '0x80454f1785347e23f8CC232159FF26fB2a4D3F38';
    const excludeWallets = '0xD667dC4da4469C064c9200C7CdfC3E60f0f22ba2';
    const chain = '0x10';

    const request: Required<GetErc20MintsRequest> = {
      chain: EvmChain.create(chain, core),
      fromBlock: 10,
      toBlock: 20,
      cursor: 'CURSOR1',
      limit: 333,
      contractAddresses: [contractAddresses],
      excludeContracts: [excludeContracts],
      walletAddresses: [walletAddresses],
      excludeWallets: [excludeWallets],
    };

    const serializedRequest = getErc20MintsOperation.serializeRequest(request, core);

    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.fromBlock).toBe(request.fromBlock);
    expect(serializedRequest.toBlock).toBe(request.toBlock);
    expect(serializedRequest.cursor).toBe(request.cursor);
    expect(serializedRequest.limit).toBe(request.limit);
    expect(serializedRequest.contractAddresses).toStrictEqual([contractAddresses.toLowerCase()]);
    expect(serializedRequest.excludeContracts).toStrictEqual([excludeContracts.toLowerCase()]);
    expect(serializedRequest.walletAddresses).toStrictEqual([walletAddresses.toLowerCase()]);
    expect(serializedRequest.excludeWallets).toStrictEqual([excludeWallets.toLowerCase()]);

    const deserializedRequest = getErc20MintsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(deserializedRequest.fromBlock).toBe(request.fromBlock);
    expect(deserializedRequest.toBlock).toBe(request.toBlock);
    expect(deserializedRequest.cursor).toBe(request.cursor);
    expect(deserializedRequest.limit).toBe(request.limit);
    expect((deserializedRequest.contractAddresses as EvmAddress[]).map((address) => address.checksum)).toStrictEqual(
      request.contractAddresses,
    );
    expect((deserializedRequest.excludeContracts as EvmAddress[]).map((address) => address.checksum)).toStrictEqual(
      request.excludeContracts,
    );
    expect((deserializedRequest.walletAddresses as EvmAddress[]).map((address) => address.checksum)).toStrictEqual(
      request.walletAddresses,
    );
    expect((deserializedRequest.excludeWallets as EvmAddress[]).map((address) => address.checksum)).toStrictEqual(
      request.excludeWallets,
    );
  });
});
