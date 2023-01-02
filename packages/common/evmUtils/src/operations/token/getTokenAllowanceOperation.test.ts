import MoralisCore from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { getTokenAllowanceOperation, GetTokenAllowanceRequest } from './getTokenAllowanceOperation';

describe('getTokenAllowanceOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const ownerAddress = '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE';
    const spenderAddress = '0xfc0cB34deAe994432fe8a11bF54d90BDf54cA8c1';
    const chain = '0x10';

    const request: Required<GetTokenAllowanceRequest> = {
      chain: EvmChain.create(chain, core),
      address: EvmAddress.create(address, core),
      ownerAddress: EvmAddress.create(ownerAddress, core),
      spenderAddress: EvmAddress.create(spenderAddress, core),
    };

    const serializedRequest = getTokenAllowanceOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.ownerAddress).toBe(ownerAddress);
    expect(serializedRequest.spenderAddress).toBe(spenderAddress);

    const deserializedRequest = getTokenAllowanceOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect((deserializedRequest.ownerAddress as EvmAddress).checksum).toBe(ownerAddress);
    expect((deserializedRequest.spenderAddress as EvmAddress).checksum).toBe(spenderAddress);
  });
});
