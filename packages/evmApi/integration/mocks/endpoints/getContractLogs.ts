import { MockScenarios } from '@moralisweb3/test-utils';
import { createErrorResponse } from '../response/errorResponse';

const createResponse = (address: string) => ({
  total: 100,
  page: 1,
  page_size: 100,
  cursor: 'string',
  result: [
    {
      transaction_hash: '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
      address,
      block_timestamp: '2021-04-02T10:07:54.000Z',
      block_number: '12526958',
      block_hash: '0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86',
      data: '0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443',
      topic0: '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
      topic1: '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
      topic2: '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
      topic3: null,
    },
  ],
});

export const mockGetContractLogs = MockScenarios.create(
  {
    name: 'mockGetContractLogs',
    url: '/:address/logs',
    getParams: (req) => ({
      address: req.params.address,
      chain: req.url.searchParams.get('chain'),
      topic0: req.url.searchParams.get('topic0'),
      topic1: req.url.searchParams.get('topic1'),
      topic2: req.url.searchParams.get('topic2'),
      topic3: req.url.searchParams.get('topic3'),
      from_date: req.url.searchParams.get('from_date'),
      to_date: req.url.searchParams.get('to_date'),
    }),
    method: 'get',
  },
  [
    {
      condition: {
        chain: '0x89',
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
        from_date: '2022-03-05T13:45:42.000Z',
        to_date: '2022-03-05T13:45:42.000Z',
        topic0: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
        topic1: '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
        topic2: '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
        topic3: '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
      },
      response: createResponse('0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989'),
      responseStatus: 200,
    },
    {
      condition: {
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
        chain: '0x5',
      },
      response: createErrorResponse('Invalid address provided'),
      responseStatus: 400,
    },
  ],
);
