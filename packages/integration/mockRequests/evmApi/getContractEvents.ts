import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

const createResponse = (address: string) => ({
  total: 12,
  page: 0,
  page_size: 100,
  cursor: null,
  result: [
    {
      transaction_hash: '0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5',
      address,
      block_timestamp: '2022-03-05T13:45:42.000Z',
      block_number: '14327217',
      block_hash: '0x1bb168d2725d15b12604c92a83c529617cd54a415c5d610a687f7859d45f9ea5',
      data: {
        from: '0x21f510cc9f81df4e4d2c705e672761cf487cdc5a',
        to: '0x54e41aa7ac19efd71d19a3ca6b8a6c0154fe3afb',
        value: '878000000',
      },
    },
  ],
});

const scenarios = [
  {
    condition: {
      chain: '0x89',
      address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
      topic: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
      fromBlock: '14327217',
      toBlock: '14327217',
      fromDate: '2022-03-05T13:45:42.000Z',
      toDate: '2022-03-05T13:45:42.000Z',
    },
    response: createResponse('0x2953399124f0cbb46d2cbacd8a89cf0599974963'),
    responseStatus: 200,
  },
];

export const mockGetContractEvents = rest.post(`${EVM_API_ROOT}/:address/events`, (req, res, ctx) => {
  const address = req.params.address as string;
  const chain = req.url.searchParams.get('chain') as string | null;
  const topic = req.url.searchParams.get('topic') as string | null;
  const fromBlock = req.url.searchParams.get('from_block') as string | null;
  const toBlock = req.url.searchParams.get('to_block') as string | null;
  const fromDate = req.url.searchParams.get('from_date') as string | null;
  const toDate = req.url.searchParams.get('to_date') as string | null;
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }
  const scenario = scenarios.find(
    (s) =>
      s.condition.address === address &&
      s.condition.chain === chain &&
      s.condition.toBlock === toBlock &&
      s.condition.fromBlock === fromBlock &&
      s.condition.topic === topic &&
      s.condition.fromDate === fromDate &&
      s.condition.toDate === toDate,
  );

  if (scenario) {
    return res(ctx.status(scenario.responseStatus), ctx.json(scenario.response));
  }

  throw new Error('getContractEvents: Not supported scenario');
});
