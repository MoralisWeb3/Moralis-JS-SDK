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
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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
