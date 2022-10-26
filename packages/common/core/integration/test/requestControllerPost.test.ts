import { Core, RequestController } from '../../src';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const postJsonMock = rest.post(`http://example.com/postJson`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      iAm: 'Batman',
    }),
  );
});

const postTextMock = rest.post(`http://example.com/postText`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.text('I am Batman'));
});

const post400ErrorMock = rest.post(`http://example.com/post400Error`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const post404ErrorMock = rest.post(`http://example.com/post404Error`, (req, res, ctx) => {
  return res(
    ctx.status(404),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const post500ErrorMock = rest.post(`http://example.com/post500Error`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const post503ErrorMock = rest.post(`http://example.com/post503Error`, (req, res, ctx) => {
  return res(
    ctx.status(503),
    ctx.json({
      message: 'I am not Batman',
    }),
  );
});

const post400ErrorMultiMessageMock = rest.post(`http://example.com/post400MultiMessageError`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({
      message: ['I am not Batman', 'I am not superman'],
    }),
  );
});

const post400ErrorEmptyJsonMock = rest.post(`http://example.com/post400ErrorEmptyJson`, (req, res, ctx) => {
  return res(ctx.status(400), ctx.json({}));
});

const post400ErrorEmptyMock = rest.post(`http://example.com/post400ErrorEmpty`, (req, res, ctx) => {
  return res(ctx.status(400));
});

const postWithSearchParams = rest.post(`http://example.com/postWithSearchParams`, (req, res, ctx) => {
  const params = req.url.searchParams;
  if (params.get('name') !== 'Batman' || params.get('age') !== '30') {
    throw new Error(`Search Params are not being correctly sent. Got params: ${JSON.stringify(params)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const postWithBodyParams = rest.post(`http://example.com/postWithBodyParams`, (req, res, ctx) => {
  const body = req.body as Record<string, unknown>;
  if (body.name !== 'Batman' || body.age !== '30') {
    throw new Error(`Body Params are not being correctly sent. Got body: ${JSON.stringify(body)}`);
  }
  return res(ctx.status(200), ctx.json({ success: true }));
});

const postWithSearchAndBodyParams = rest.post(`http://example.com/postWithSearchAndBodyParams`, (req, res, ctx) => {
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
  postJsonMock,
  postTextMock,
  post400ErrorMock,
  post404ErrorMock,
  post500ErrorMock,
  post503ErrorMock,
  post400ErrorMultiMessageMock,
  post400ErrorEmptyJsonMock,
  post400ErrorEmptyMock,
  postWithSearchParams,
  postWithBodyParams,
  postWithSearchAndBodyParams,
];

const mockServer = setupServer(...handlers);

describe('RequestControllerPost', () => {
  let requestController: RequestController;

  beforeAll(() => {
    const core = Core.create();
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

  it('should post a valid Json response', async () => {
    const result = await requestController.post('http://example.com/postJson');

    expect(result).toStrictEqual({ iAm: 'Batman' });
  });

  it('should post a valid text response', async () => {
    const result = await requestController.post('http://example.com/postText');

    expect(result).toStrictEqual('I am Batman');
  });

  it('should throw an error on 400 response', async () => {
    expect(requestController.post('http://example.com/post400Error')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman',
    );
  });

  it('should throw an error on 404 response', async () => {
    expect(requestController.post('http://example.com/post404Error')).rejects.toThrowError(
      '[C0006] Request failed, Not Found(404): I am not Batman',
    );
  });

  it('should throw an error on 500 response', async () => {
    expect(requestController.post('http://example.com/post500Error')).rejects.toThrowError(
      '[C0006] Request failed, Internal Server Error(500): I am not Batman',
    );
  });

  it('should throw an error on 503 response', async () => {
    expect(requestController.post('http://example.com/post503Error')).rejects.toThrowError(
      '[C0006] Request failed, Service Unavailable(503): I am not Batman',
    );
  });

  it('should handle multiple messages in an error response', async () => {
    expect(requestController.post('http://example.com/post400MultiMessageError')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): I am not Batman, I am not superman',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.post('http://example.com/post400ErrorEmptyJson')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should handle empty error response', async () => {
    expect(requestController.post('http://example.com/post400ErrorEmpty')).rejects.toThrowError(
      '[C0006] Request failed, Bad Request(400): Unknown error (no error info returned from API)',
    );
  });

  it('should send the correct searchParams', async () => {
    const result = await requestController.post('http://example.com/postWithSearchParams', {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct bodyparams', async () => {
    const result = await requestController.post('http://example.com/postWithBodyParams', undefined, {
      name: 'Batman',
      age: '30',
    });

    expect(result).toStrictEqual({ success: true });
  });

  it('should send the correct searchparams and bodyparams', async () => {
    const result = await requestController.post(
      'http://example.com/postWithSearchAndBodyParams',
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
