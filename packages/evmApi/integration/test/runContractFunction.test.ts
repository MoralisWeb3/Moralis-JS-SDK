import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

const ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

describe('runContractFunction', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('should run a contract and return readonly data', async () => {
    const result = await evmApi.utils.runContractFunction({
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      functionName: 'name',
      chain: 0x1,
      subdomain: 'foo.com',
      abi: ABI,
      params: {},
      providerUrl: 'https://url',
    });

    expect(result).toBeDefined();
    expect(result.result).toEqual('Wrapped Ether');
  });
});
