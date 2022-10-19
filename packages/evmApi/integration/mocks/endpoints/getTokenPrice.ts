import { rest } from 'msw';
import { EVM_API_ROOT, MOCK_API_KEY } from '../config';

function createResponse(exchangeAddress: string) {
  return {
    nativePrice: { value: '8244913831', decimals: 18, name: 'Ether', symbol: 'ETH' },
    usdPrice: 0.000011961341215674,
    exchangeAddress,
    exchangeName: 'Uniswap v3',
  };
}

const scenarios = [
  {
    url: {
      address: '0x0000000000000000000000000000000000000001',
      chain: '0x1',
      toBlock: null,
    },
    response: createResponse('0x0000000000000000000000000000000000000001'),
  },
  {
    url: {
      address: '0x0000000000000000000000000000000000000002',
      chain: '0x13881',
      toBlock: null,
    },
    response: createResponse('0x0000000000000000000000000000000000000002'),
  },
  {
    url: {
      address: '0x0000000000000000000000000000000000000003',
      chain: '0x1',
      toBlock: '512',
    },
    response: createResponse('0x0000000000000000000000000000000000000003'),
  },
];

export const mockGetTokenPrice = rest.get(`${EVM_API_ROOT}/erc20/:address/price`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const address = req.params.address as string;
  const chain = req.url.searchParams.get('chain') as string | null;
  const toBlock = req.url.searchParams.get('to_block') as string | null;

  if (apiKey !== MOCK_API_KEY) {
    return res(ctx.status(401));
  }

  const scenario = scenarios.find(
    (s) => s.url.address === address && s.url.chain === chain && s.url.toBlock === toBlock,
  );
  if (scenario) {
    return res(ctx.status(200), ctx.json(scenario.response));
  }

  throw new Error(`getTokenPrice: Not supported scenario (chain=${chain}, toBlock=${toBlock})`);
});
