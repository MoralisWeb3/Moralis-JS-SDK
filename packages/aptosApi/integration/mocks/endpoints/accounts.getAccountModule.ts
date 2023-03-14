import { MockScenarios } from '@moralisweb3/test-utils';

export const mockGetAccountModule = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetAccountModule',
    url: `/accounts/:address/resource/:module_name`,
    getParams: ({ req }) => ({
      address: req.params.address,
      moduleName: req.params.module_name,
    }),
  },
  [
    {
      condition: {
        address: '0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1',
        moduleName: 'module_name_todo',
      },
      response: {
        bytecode: '0xbytecode_todo',
        abi: {
          address: '0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1',
          name: 'string',
          friends: ['0x1::aptos_coin'],
          exposed_functions: [
            {
              name: 'string',
              visibility: 'private',
              is_entry: true,
              generic_type_params: [{ constraints: ['todo_x1'] }],
              params: ['string'],
              return: ['string'],
            },
          ],
          structs: [
            {
              name: 'string',
              is_native: true,
              abilities: ['string'],
              generic_type_params: [{ constraints: ['todo_x1'] }],
              fields: [
                {
                  name: 'string',
                  type: 'string',
                },
              ],
            },
          ],
        },
      },
    },
  ],
);
