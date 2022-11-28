import MoralisCore from '@moralisweb3/common-core';
import { SolAddress, SolNetwork } from '../../dataTypes';
import { getTokenPriceOperation, GetTokenPriceRequest } from './getTokenPriceOperation';

describe('getTokenPriceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';
    const network = 'mainnet';

    const request: Required<GetTokenPriceRequest> = {
      address: SolAddress.create(address),
      network: SolNetwork.create(network),
    };

    const serializedRequest = getTokenPriceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.network).toBe(network);

    const deserializedRequest = getTokenPriceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as SolAddress).address).toBe(address);
    expect((deserializedRequest.network as SolNetwork).network).toBe(network);
  });
});
