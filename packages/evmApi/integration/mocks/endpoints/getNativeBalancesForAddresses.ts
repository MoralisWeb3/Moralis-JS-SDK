import { MockScenarios } from '@moralisweb3/test-utils';
import { createBalancesResponse } from '../response/balancesResponse';

export const mockGetNativeBalancesForAddresses = MockScenarios.create(
  {
    method: 'get',
    name: 'mockGetNativeBalancesForAddresses',
    url: '/wallets/balance',
    getParams: ({ req }) => {
      return {
        walletAddresses: req.url.searchParams.getAll('wallet_addresses[]'),
      };
    },
  },
  [
    {
      condition: {
        walletAddresses: ['0x7dE3085b3190B3a787822Ee16F23be010f5F8686', '0xE92d1A43df510F82C66382592a047d288f85226f'],
      },
      response: createBalancesResponse(),
    },
  ],
);
