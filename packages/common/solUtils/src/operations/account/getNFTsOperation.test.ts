import MoralisCore from '@moralisweb3/common-core';
import { SolAddress, SolNetwork } from '../../dataTypes';
import { getNFTsOperation, GetNFTsRequest } from './getNFTsOperation';

describe('getNFTsOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';
    const network = 'mainnet';

    const request: Required<GetNFTsRequest> = {
      address: SolAddress.create(address),
      network: SolNetwork.create(network),
    };

    const serializedRequest = getNFTsOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.network).toBe(network);

    const deserializedRequest = getNFTsOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as SolAddress).address).toBe(address);
    expect((deserializedRequest.network as SolNetwork).network).toBe(network);
  });
});
