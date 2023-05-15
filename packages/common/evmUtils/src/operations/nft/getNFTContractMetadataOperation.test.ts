import { Core } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getNFTContractMetadataOperation, GetNFTContractMetadataRequest } from './getNFTContractMetadataOperation';

describe('getNFTContractMetadataOperation', () => {
  let core: Core;

  beforeAll(() => {
    core = Core.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<GetNFTContractMetadataRequest> = {
      chain: EvmChain.create(chain),
      address: EvmAddress.create(address),
    };

    const serializedRequest = getNFTContractMetadataOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);

    const deserializedRequest = getNFTContractMetadataOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
  });
});
