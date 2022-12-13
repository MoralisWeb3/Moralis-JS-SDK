import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosRetry, AxiosRetryConfig } from './AxiosRetry';

describe('AxiosRetry', () => {
  function createResponse(data: string, status: number): AxiosResponse<string> {
    return {
      config: {},
      data,
      headers: {},
      status,
      statusText: '?',
    };
  }

  function spyAxios(throwErrorUntilAttempt: number, errorResponseStatus?: number) {
    let attempt = 0;
    return jest.spyOn(axios, 'request').mockImplementation(async () => {
      try {
        if (attempt < throwErrorUntilAttempt) {
          throw new AxiosError(
            `Request ${attempt}`,
            'Error',
            {},
            {},
            createResponse('Error', errorResponseStatus || 444),
          );
        }
        return createResponse('Success', 200);
      } finally {
        attempt++;
      }
    });
  }

  function createRetryConfig(maxRetries: number): AxiosRetryConfig {
    return {
      maxRetries,
      allowedMethods: ['GET'],
      allowedResponseStatuses: [444],
    };
  }

  // tests

  it('should not retry when first request is success', async () => {
    const axiosSpy = spyAxios(0);
    const retryConfig = createRetryConfig(1);

    const response = await AxiosRetry.request<unknown, string>(retryConfig, {
      method: 'GET',
      url: 'https://localhost/a.json',
    });

    expect(axiosSpy).toBeCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual('Success');
    axiosSpy.mockRestore();
  });

  it('should throw error when limit is over', async () => {
    const axiosSpy = spyAxios(999);
    const retryConfig = createRetryConfig(3);

    await expect(async () => {
      await AxiosRetry.request<unknown, string>(retryConfig, {
        method: 'GET',
        url: 'https://localhost/a.json',
      });
    }).rejects.toThrowError('Request 2');

    axiosSpy.mockRestore();
  });

  it('should not retry when the method is not included in allowedMethods', async () => {
    const axiosSpy = spyAxios(3);
    const retryConfig = createRetryConfig(4);

    await expect(async () => {
      await AxiosRetry.request<unknown, string>(retryConfig, {
        method: 'POST',
        url: 'https://localhost/a.json',
      });
    }).rejects.toThrowError('Request 0');

    axiosSpy.mockRestore();
  });

  it('should not retry when response status is not included in allowedResponseStatuses', async () => {
    const axiosSpy = spyAxios(3, 500);
    const retryConfig = createRetryConfig(4);

    await expect(async () => {
      await AxiosRetry.request<unknown, string>(retryConfig, {
        method: 'GET',
        url: 'https://localhost/a.json',
      });
    }).rejects.toThrowError('Request 0');

    axiosSpy.mockRestore();
  });

  it('should retry', async () => {
    const axiosSpy = spyAxios(3);
    const beforeRetrySpy = jest.fn(() => {});

    const retryConfig = createRetryConfig(4);
    retryConfig.beforeRetry = beforeRetrySpy;

    const response = await AxiosRetry.request<unknown, string>(retryConfig, {
      method: 'get',
      url: 'https://localhost/a.json',
    });

    expect(axiosSpy).toBeCalledTimes(4);
    expect(beforeRetrySpy).toBeCalledTimes(3);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual('Success');
    axiosSpy.mockRestore();
  });
});
