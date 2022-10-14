import { MoralisCore, RequestController } from '../../src';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const deleteJsonMock = rest.delete(`http://example.com/deleteJson`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      iAm: 'Batman',
    }),
  );
});

const deleteTextMock = rest.delete(`http://example.com/deleteText`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.text('I am Batman'));
});

const delete400ErrorMock = rest.delete(`http://example.com/delete400Error`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const delete404ErrorMock = rest.delete(`http://example.com/delete404Error`, (req, res, ctx) => {
  return res(
    ctx.status(404),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const delete500ErrorMock = rest.delete(`http://example.com/delete500Error`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const delete503ErrorMock = rest.delete(`http://example.com/delete503Error`, (req, res, ctx) => {
  return res(
    ctx.status(503),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const delete400ErrorMultiMessageMock = rest.delete(`http://example.com/delete400MultiMessageError`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: ['I am not Batman', 'I am not superman'],
    }),
  );
});

const delete400ErrorEmptyJsonMock = rest.delete(`http://example.com/delete400ErrorEmptyJson`, (req, res, ctx) => {
  return res(ctx.status(400), ctx.json({}));
});

const delete400ErrorEmptyMock = rest.delete(`http://example.com/delete400ErrorEmpty`, (req, res, ctx) => {
  return res(ctx.status(400));
});

const deleteWithSearchParams = rest.delete(`http://example.com/deleteWithSearchParams`, (req, res, ctx) => {
  const params = req.url.searchParams;
  if (params.get('name') !== 'Batman' || params.get('age') !== '30') {
    throw new Error(`Search Params are not being correctly sent. Got params: ${JSON.stringify(params)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const deleteWithBodyParams = rest.delete(`http://example.com/deleteWithBodyParams`, (req, res, ctx) => {
  const body = req.body as Record<string, unknown>;
  if (body.name !== 'Batman' || body.age !== '30') {
    throw new Error(`Body Params are not being correctly sent. Got body: ${JSON.stringify(body)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const deleteWithSearchAndBodyParams = rest.delete(
  `http://example.com/deleteWithSearchAndBodyParams`,
  (req, res, ctx) => {
    const body = req.body as Record<string, unknown>;
    const params = req.url.searchParams;

    if (params.get('name') !== 'Batman' || body.age !== '30') {
      throw new Error(
        `Params are not being correctly sent. Got body: ${JSON.stringify(body)}, Got params: ${JSON.stringify(params)}`,
      );
    }
    return res(ctx.status(200), ctx.json({ success: true }));
  },
);

const handlers = [
  deleteJsonMock,
  deleteTextMock,
  delete400ErrorMock,
  delete404ErrorMock,
  delete500ErrorMock,
  delete503ErrorMock,
  delete400ErrorMultiMessageMock,
  delete400ErrorEmptyJsonMock,
  delete400ErrorEmptyMock,
  deleteWithSearchParams,
  deleteWithBodyParams,
  deleteWithSearchAndBodyParams,
];

const mockServer = setupServer(...handlers);

describe('RequestControllerDelete', () => {
  let requestController: RequestController;

  beforeAll(() => {
    const core = MoralisCore.create();
    requestController = RequestController.create(core);

    mockServer.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    mockServer.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    /**
     * Prevent issue with Jest and MSW when running multiple tests,
     * where tests are finished before all requests are resolved
     * https://github.com/mswjs/msw/issues/474
     */
    await new Promise((resolve) => setTimeout(resolve.bind(null), 0));
  });

  it('should delete a valid Json response', async () => {
    const result = await requestController.delete('http://example.com/deleteJson');

    expect(result).toStrictEqual({ iAm: 'Batman' });
  });

  it('should delete a valid text response', async () => {
    const result = await requestController.delete('http://example.com/deleteText');

    expect(result).toStrictEqual('I am Batman');
  });

  it('should throw an error on 400 response', async () => {
    expect(requestController.delete('http://example.com/delete400Error')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman',
    );
  });

  it('should throw an error on 404 response', async () => {
    expect(requestController.delete('http://example.com/delete404Error')).rejects.toThrowError(
      '[C0006] Request failed, Not Found(404): I am not Batman',
    );
  });

  it('should throw an error on 500 response', async () => {
    expect(requestController.delete('http://example.com/delete500Error')).rejects.toThrowError(
      '[C0006] Request failed, Internal Server Error(500): I am not Batman',
    );
  });

  it('should throw an error on 503 response', async () => {
    expect(requestController.delete('http://example.com/delete503Error')).rejects.toThrowError(
      '[C0006] Request failed, Service Unavailable(503): I am not Batman',
    );
  });

  it('should handle multiple messages in an error response', async () => {
    expect(requestController.delete('http://example.com/delete400MultiMessageError')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman, I am not superman',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.delete('http://example.com/delete400ErrorEmptyJson')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.delete('http://example.com/delete400ErrorEmpty')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should send the correct searchParams', async () => {
    const result = await requestController.delete('http://example.com/deleteWithSearchParams', {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct bodyparams', async () => {
    const result = await requestController.delete('http://example.com/deleteWithBodyParams', undefined, {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct searchparams and bodyparams', async () => {
    const result = await requestController.delete(
      'http://example.com/deleteWithSearchAndBodyParams',
      {
        name: 'Batman',
      },
      {
        age: '30',
      },
    );

    expect(result).toStrictEqual({ success: true });
  });
});
