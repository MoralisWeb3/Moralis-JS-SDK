import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

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

const scenarios = [
  {
    condition: {
      chain: '0x89',
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989',
      fromDate: '2022-03-05T13:45:42.000Z',
      toDate: '2022-03-05T13:45:42.000Z',
      subdomain: 'ethereum',
      topic0: '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
      topic1: '0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391',
      topic2: '0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9',
      topic3: null,
    },
    response: createResponse('0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b989'),
    responseStatus: 200,
  },
];

export const mockGetContractLogs = rest.get(`${EVM_API_ROOT}/:address/logs`, (req, res, ctx) => {
  const address = req.params.address as string;
  const chain = req.url.searchParams.get('chain') as string | null;
  const topic3 = req.url.searchParams.get('topic3') as string | null;
  const fromDate = req.url.searchParams.get('from_date') as string | null;
  const toDate = req.url.searchParams.get('to_date') as string | null;
  const topic0 = req.url.searchParams.get('topic0') as string | null;
  const topic1 = req.url.searchParams.get('topic1') as string | null;
  const topic2 = req.url.searchParams.get('topic2') as string | null;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  if (!address) {
    return res(ctx.status(404));
  }

  const scenario = scenarios.find(
    (s) =>
      s.condition.address === address &&
      s.condition.chain === chain &&
      s.condition.topic1 === topic1 &&
      s.condition.topic2 === topic2 &&
      s.condition.topic3 === topic3 &&
      s.condition.fromDate === fromDate &&
      s.condition.toDate === toDate &&
      s.condition.topic0 === topic0,
  );

  if (scenario) {
    return res(ctx.status(scenario.responseStatus), ctx.json(scenario.response));
  }

  throw new Error('getContractLogs: Not supported scenario');
});
