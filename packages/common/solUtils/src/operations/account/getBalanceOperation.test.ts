import MoralisCore from '@moralisweb3/core';
import { SolAddress, SolNetwork } from '../../dataTypes';
import { getBalanceOperation, GetBalanceRequest } from './getBalanceOperation';

describe('getBalanceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';
    const network = 'mainnet';

    const request: Required<GetBalanceRequest> = {
      address: SolAddress.create(address),
      network: SolNetwork.create(network),
    };

    const serializedRequest = getBalanceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.network).toBe(network);

    const deserializedRequest = getBalanceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as SolAddress).address).toBe(address);
    expect((deserializedRequest.network as SolNetwork).network).toBe(network);
  });
});
