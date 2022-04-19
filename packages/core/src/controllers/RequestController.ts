import ky, { HTTPError } from 'ky-universal';
import core from '../MoralisCore';
import { CoreErrorCode, MoralisCoreError } from '../Error';

interface BaseOptions {
  headers?: Record<string, string | undefined>;
}

/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
export class RequestController {
  // TODO: inject core dependency
  private static baseRequest<Body extends {}, Response extends unknown>(options?: BaseOptions) {
    return ky.create({
      headers: options?.headers,
      retry: {
        limit: 2,
        methods: ['get', 'options'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
      timeout: 10000,

      hooks: {
        beforeRequest: [
          (request) => {
            core.logger.verbose('[RequestController] request started', {
              url: request.url,
              method: request.method,
              body: request.bodyUsed,
            });
          },
        ],
        afterResponse: [
          (request) => {
            core.logger.verbose('[RequestController] request success', {
              url: request.url,
              method: request.method,
              body: request.bodyUsed,
            });
          },
        ],
        beforeError: [
          (httpError) => {
            core.logger.verbose('[RequestController] request error', {
              url: httpError.request.url,
              method: httpError.request.method,
              body: httpError.request.bodyUsed,
              cause: httpError.cause,
              name: httpError.name,
              response: httpError.response,
            });

            return httpError;
          },
        ],
        beforeRetry: [
          (state) => {
            core.logger.verbose('[RequestController] request retry', {
              url: state.request.url,
              method: state.request.method,
              body: state.request.bodyUsed,
              error: state.error,
              retryCount: state.retryCount,
            });
          },
        ],
      },
    });
  }

  private static makeError(error: unknown) {
    if (!(error instanceof Error)) {
      return error;
    }

    if (error instanceof HTTPError) {
      const httpError = error as HTTPError;
      return new MoralisCoreError({
        code: CoreErrorCode.REQUEST_ERROR,
        message: `Request failed with status ${httpError.response.status}`,
        cause: error,
        details: {
          status: httpError.response.status,
          request: httpError.request,
          response: httpError.request,
          options: httpError.options,
        },
      });
    }

    return new MoralisCoreError({
      code: CoreErrorCode.REQUEST_ERROR,
      message: `Request failed`,
      cause: error,
    });
  }

  static async post<Response extends unknown, Params extends Record<string, string>, Body extends {}>(
    url: string,
    params?: Params,
    body?: Body,
    options?: BaseOptions,
    abortSignal?: AbortController['signal'],
  ) {
    try {
      const result = await this.baseRequest(options)
        .post(url, { json: body, searchParams: params, signal: abortSignal })
        .json<Response>();
      return result;
    } catch (error) {
      throw this.makeError(error);
    }
  }
  static async get<Response extends unknown, Params extends Record<string, string>>(
    url: string,
    params?: Params,
    options?: BaseOptions,
    abortSignal?: AbortController['signal'],
  ) {
    try {
      const result = await this.baseRequest(options)
        .get(url, { signal: abortSignal, searchParams: params })
        .json<Response>();
      return result;
    } catch (error) {
      throw this.makeError(error);
    }
  }
}
