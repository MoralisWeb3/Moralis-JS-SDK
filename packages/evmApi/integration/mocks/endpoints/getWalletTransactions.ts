/* eslint-disable etc/no-commented-out-code */
import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

export const mockGetWalletTransactions = MockScenarios.create(
  {
    method: 'get',
    url: `/:address`,
    name: 'mockGetWalletTransactions',
    getParams: (req) => ({
      address: req.params.address,
      chain: req.url.searchParams.get('chain'),
      subdomain: req.url.searchParams.get('subdomain'),
      from_block: req.url.searchParams.get('from_block'),
      to_block: req.url.searchParams.get('to_block'),
      limit: req.url.searchParams.get('limit'),
      to_date: req.url.searchParams.get('to_date'),
      from_date: req.url.searchParams.get('from_date'),
      cursor: req.url.searchParams.get('cursor'),
    }),
  },
  [
    {
      condition: {
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
        chain: '0x5',
      },
      response: createErrorResponse('Invalid address provided'),
      responseStatus: 400,
    },
    {
      condition: {
        address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
        chain: '0x5',
      },
      response: {
        total: 2000,
        page: 2,
        page_size: 100,
        result: [
          {
            hash: '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e',
            nonce: '326595425',
            transaction_index: '25',
            from_address: '0xd4a3BebD824189481FC45363602b83C9c7e9cbDf',
            to_address: '0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef',
            value: '650000000000000000',
            gas: '6721975',
            gas_price: '20000000000',
            input: 'string',
            receipt_cumulative_gas_used: '1340925',
            receipt_gas_used: '1340925',
            receipt_contract_address: '0x1d6a4cf64b52f6c73f201839aded7379ce58059c',
            receipt_root: 'string',
            receipt_status: '1',
            block_timestamp: '2021-04-02T10:07:54.000Z',
            block_number: '12526958',
            block_hash: '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
          },
        ],
      },
    },
  ],
);
