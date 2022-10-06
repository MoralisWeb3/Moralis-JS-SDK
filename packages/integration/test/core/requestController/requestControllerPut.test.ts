import { MoralisCore, RequestController } from '@moralisweb3/core';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const putJsonMock = rest.put(`http://example.com/putJson`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      iAm: 'Batman',
    }),
  );
});

const putTextMock = rest.put(`http://example.com/putText`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.text('I am Batman'));
});

const put400ErrorMock = rest.put(`http://example.com/put400Error`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const put404ErrorMock = rest.put(`http://example.com/put404Error`, (req, res, ctx) => {
  return res(
    ctx.status(404),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const put500ErrorMock = rest.put(`http://example.com/put500Error`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const put503ErrorMock = rest.put(`http://example.com/put503Error`, (req, res, ctx) => {
  return res(
    ctx.status(503),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const put400ErrorMultiMessageMock = rest.put(`http://example.com/put400MultiMessageError`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: ['I am not Batman', 'I am not superman'],
    }),
  );
});

const put400ErrorEmptyJsonMock = rest.put(`http://example.com/put400ErrorEmptyJson`, (req, res, ctx) => {
  return res(ctx.status(400), ctx.json({}));
});

const put400ErrorEmptyMock = rest.put(`http://example.com/put400ErrorEmpty`, (req, res, ctx) => {
  return res(ctx.status(400));
});

const putWithSearchParams = rest.put(`http://example.com/putWithSearchParams`, (req, res, ctx) => {
  const params = req.url.searchParams;
  if (params.get('name') !== 'Batman' || params.get('age') !== '30') {
    throw new Error(`Search Params are not being correctly sent. Got params: ${JSON.stringify(params)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const putWithBodyParams = rest.put(`http://example.com/putWithBodyParams`, (req, res, ctx) => {
  const body = req.body as Record<string, unknown>;
  if (body.name !== 'Batman' || body.age !== '30') {
    throw new Error(`Body Params are not being correctly sent. Got body: ${JSON.stringify(body)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const putWithSearchAndBodyParams = rest.put(`http://example.com/putWithSearchAndBodyParams`, (req, res, ctx) => {
  const body = req.body as Record<string, unknown>;
  const params = req.url.searchParams;

  if (params.get('name') !== 'Batman' || body.age !== '30') {
    throw new Error(
      `Params are not being correctly sent. Got body: ${JSON.stringify(body)}, Got params: ${JSON.stringify(params)}`,
    );
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const handlers = [
  putJsonMock,
  putTextMock,
  put400ErrorMock,
  put404ErrorMock,
  put500ErrorMock,
  put503ErrorMock,
  put400ErrorMultiMessageMock,
  put400ErrorEmptyJsonMock,
  put400ErrorEmptyMock,
  putWithSearchParams,
  putWithBodyParams,
  putWithSearchAndBodyParams,
];

const mockServer = setupServer(...handlers);

describe('RequestControllerPut', () => {
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

  it('should put a valid Json response', async () => {
    const result = await requestController.put('http://example.com/putJson');

    expect(result).toStrictEqual({ iAm: 'Batman' });
  });

  it('should put a valid text response', async () => {
    const result = await requestController.put('http://example.com/putText');

    expect(result).toStrictEqual('I am Batman');
  });

  it('should throw an error on 400 response', async () => {
    expect(requestController.put('http://example.com/put400Error')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman',
    );
  });

  it('should throw an error on 404 response', async () => {
    expect(requestController.put('http://example.com/put404Error')).rejects.toThrowError(
      '[C0006] Request failed, Not Found(404): I am not Batman',
    );
  });

  it('should throw an error on 500 response', async () => {
    expect(requestController.put('http://example.com/put500Error')).rejects.toThrowError(
      '[C0006] Request failed, Internal Server Error(500): I am not Batman',
    );
  });

  it('should throw an error on 503 response', async () => {
    expect(requestController.put('http://example.com/put503Error')).rejects.toThrowError(
      '[C0006] Request failed, Service Unavailable(503): I am not Batman',
    );
  });

  it('should handle multiple messages in an error response', async () => {
    expect(requestController.put('http://example.com/put400MultiMessageError')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman, I am not superman',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.put('http://example.com/put400ErrorEmptyJson')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.put('http://example.com/put400ErrorEmpty')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should send the correct searchParams', async () => {
    const result = await requestController.put('http://example.com/putWithSearchParams', {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct bodyparams', async () => {
    const result = await requestController.put('http://example.com/putWithBodyParams', undefined, {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct searchparams and bodyparams', async () => {
    const result = await requestController.put(
      'http://example.com/putWithSearchAndBodyParams',
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
