import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

const DeleteAddressResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE: {
    data: {
      streamId: 'VALID_RESPONSE',
      address: '0x992eccc191d6f74e8be187ed6b6ac196b08314f7',
    },
    status: 200,
  },
  INVALID_ADDRESS: {
    data: {
      message: 'Invalid Address: some-address',
    },
    status: 400,
  },
  STREAM_NOT_FOUND: {
    data: {
      message: 'Stream not found',
    },
    status: 404,
  },
  ADDRESS_NOT_FOUND: {
    data: {
      message: 'Address not found',
    },
    status: 404,
  },
};

export const mockDeleteAddressEvm = rest.delete(`${STREAM_API_ROOT}/streams/evm/:id/address`, (req, res, ctx) => {
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

  if (DeleteAddressResponse[id]) {
    return res(ctx.status(DeleteAddressResponse[id].status), ctx.json(DeleteAddressResponse[id].data));
  }

  throw new Error('addAddressEvm: Not supported scenario');
});
