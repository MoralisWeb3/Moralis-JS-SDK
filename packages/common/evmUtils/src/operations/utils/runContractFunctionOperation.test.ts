import MoralisCore from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '../../dataTypes';
import { runContractFunctionOperation, RunContractFunctionRequest } from './runContractFunctionOperation';

describe('runContractFunctionOperation', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = MoralisCore.create();
  });

  it('serializeRequest() serializes correctly and deserializeRequest() deserializes correctly', () => {
    const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
    const chain = '0x10';

    const request: Required<RunContractFunctionRequest> = {
      address: EvmAddress.create(address, core),
      chain: EvmChain.create(chain, core),
      functionName: 'myFunction',
      params: { x: 1 },
      abi: [
        /* empty abi */
      ],
      providerUrl: 'https://provider.com/url',
      subdomain: 'my-domain.com',
    };

    const serializedRequest = runContractFunctionOperation.serializeRequest(request, core);

    expect(serializedRequest.address).toBe(address);
    expect(serializedRequest.chain).toBe(chain);
    expect(serializedRequest.functionName).toBe(request.functionName);
    expect(serializedRequest.params).toBe(request.params);
    expect(serializedRequest.abi).toBe(request.abi);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.subdomain).toBe(request.subdomain);

    const deserializedRequest = runContractFunctionOperation.deserializeRequest(serializedRequest, core);

    expect((deserializedRequest.address as EvmAddress).checksum).toBe(address);
    expect((deserializedRequest.chain as EvmChain).apiHex).toBe(chain);
    expect(serializedRequest.functionName).toBe(request.functionName);
    expect(serializedRequest.params).toBe(request.params);
    expect(serializedRequest.abi).toBe(request.abi);
    expect(serializedRequest.providerUrl).toBe(request.providerUrl);
    expect(serializedRequest.subdomain).toBe(request.subdomain);
  });
});
