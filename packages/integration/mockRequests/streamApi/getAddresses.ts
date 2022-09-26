import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

const GetAddressesResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE_0: {
    data: {
      result: [],
      total: 0,
    },
    status: 200,
  },
  VALID_RESPONSE_1: {
    data: {
      result: [
        {
          address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
          id: 'bdf3fa5b-c3e1-485f-a69b-225e57fbc042',
        },
      ],
      total: 1,
    },
    status: 200,
  },
  VALID_RESPONSE_2: {
    data: {
      result: [
        {
          address: '0x295522b61890c3672d12efbff4358a6411ce996f',
          id: '72decebb-60dc-48d3-962a-f67d5b4e36d3',
        },
        {
          address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
          id: 'bdf3fa5b-c3e1-485f-a69b-225e57fbc042',
        },
      ],
      total: 2,
    },
    status: 200,
  },
  VALID_RESPONSE_CURSOR: {
    data: {
      result: [
        {
          address: '0x0ccedbd2f0fecc5fdaf9097e513f18c5da47fca2',
          id: '92b96d04-a7a7-42d5-89fe-d9673224637f',
        },
      ],
      cursor: 'cd07aa2328b9243d6dacfb10433184ab3d36a89f97b516dd09cbb803f5039adb0032d0dfe8132aa51e1c1112c505aeaa',
      total: 2,
    },
    status: 200,
  },
  STREAM_NOT_FOUND: {
    data: {
      message: 'Stream not found',
    },
    status: 404,
  },
};

export const mockGetAddressesEvm = rest.get(`${STREAM_API_ROOT}/streams/evm/:id/address`, (req, res, ctx) => {
  const apiKey = req.headers.get('x-api-key');
  const id = req.params.id as string;

  if (apiKey !== MOCK_API_KEY) {
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Api Key Not Present',
      }),
    );
  }

  if (GetAddressesResponse[id]) {
    return res(ctx.status(GetAddressesResponse[id].status), ctx.json(GetAddressesResponse[id].data));
  }

  throw new Error('addAddressEvm: Not supported scenario');
});
