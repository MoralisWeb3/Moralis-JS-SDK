import { rest } from 'msw';
import { STREAM_API_ROOT, MOCK_API_KEY } from '../config';

const AddAddressResponse: Record<string, { data: any; status: number }> = {
  VALID_RESPONSE: {
    data: {
      streamId: 'VALID_RESPONSE',
      address: '0x295522b61890c3672d12efbff4358a6411ce996f',
    },
    status: 200,
  },
  MULTIPLE_ADDRESSES: {
    data: {
      streamId: 'MULTIPLE_ADDRESSES',
      address: ['0x295522b61890c3672d12efbff4358a6411ce996f', '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'],
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
};

export const mockAddAddressEvm = rest.put(`${STREAM_API_ROOT}/streams/evm/:id/address`, (req, res, ctx) => {
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

  if (AddAddressResponse[id]) {
    return res(ctx.status(AddAddressResponse[id].status), ctx.json(AddAddressResponse[id].data));
  }

  throw new Error('addAddressEvm: Not supported scenario');
});
