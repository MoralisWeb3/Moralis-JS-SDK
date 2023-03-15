import { MockScenarios } from '@moralisweb3/test-utils';

export const mockEstimateGasPrice = MockScenarios.create(
  {
    method: 'get',
    name: 'mockEstimateGasPrice',
    url: `/transactions/estimate_gas_price`,
    getParams: () => ({}),
  },
  [
    {
      condition: {},
      response: {
        deprioritized_gas_estimate: 100,
        gas_estimate: 133,
        prioritized_gas_estimate: 150,
      },
    },
  ],
);
