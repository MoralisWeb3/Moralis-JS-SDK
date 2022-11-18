import { MockScenarios } from '@moralisweb3/test-utils';

export const mockRunContractFunction = MockScenarios.create(
  {
    name: 'mockRunContractFunction',
    getParams: (req) => ({
      address: req.params.address,
      chain: req.url.searchParams.get('chain'),
      function_name: req.url.searchParams.get('function_name'),
      subdomain: req.url.searchParams.get('subdomain'),
      providerUrl: req.url.searchParams.get('providerUrl'),
      abi: req.body['abi'],
      params: req.body['params'],
    }),
    url: '/:address/function',
    method: 'post',
  },
  [
    {
      condition: {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        chain: '0x1',
        function_name: 'name',
        subdomain: 'foo.com',
        providerUrl: 'https://url',
        abi: [
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
        ],
        params: {},
      },
      response: 'Wrapped Ether' as never,
    },
  ],
);
