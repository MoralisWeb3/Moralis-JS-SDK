import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { AxiosRetry, AxiosRetryConfig } from './AxiosRetry';
import { isTest } from '../environment/isTest';
import { noop } from '../utils/noop';
import { MoralisCore } from '../MoralisCore';
import { LoggerController } from './LoggerController';

export interface RequestOptions {
  headers?: { [name: string]: string };
}

/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
export class RequestController {
  public static create(core: MoralisCore): RequestController {
    return new RequestController(core.logger);
  }

  private constructor(private readonly logger: LoggerController) {}

  private async request<Data, Response>(config: AxiosRequestConfig<Data>): Promise<Response> {
    this.logger.verbose('[RequestController] request started', {
      url: config.url,
      method: config.method,
      body: config.data,
    });

    const retryConfig: AxiosRetryConfig = {
      maxAttempts: 2,
      allowedMethods: ['GET', 'OPTIONS'],
      allowedResponseStatuses: [408, 413, 429, 500, 502, 503, 504],
      beforeRetry: (attempt: number, error: AxiosError) => {
        this.logger.verbose('[RequestController] request retry', {
          url: config.url,
          method: config.method,
          body: config.data,
          error,
          attempt,
        });
      },
    };

    try {
      if (isTest()) {
        /**
         * Known issue where in Jest, axios.request() will leave open handlers.
         * See: https://stackoverflow.com/questions/69169492/async-external-function-leaves-open-handles-jest-supertest-express
         */
        await process.nextTick(noop);
      }

      const response = await AxiosRetry.request<Data, Response>(retryConfig, {
        ...config,
        timeout: 10000,
      });
      return response.data;
    } catch (e) {
      const error = this.makeError(e);

      this.logger.verbose('[RequestController] request error', {
        url: config.url,
        method: config.method,
        body: config.data,
        cause: error.cause,
        name: error.name,
        details: error.details,
      });
      throw error;
    }
  }

  private makeError(error: unknown): MoralisCoreError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return new MoralisCoreError({
        code: CoreErrorCode.REQUEST_ERROR,
        message: `Request failed with status ${axiosError.response?.status}: ${axiosError.message}`,
        cause: error,
        details: {
          status: axiosError.response?.status,
          request: axiosError.request,
          response: axiosError.response,
        },
      });
    }

    const err = error instanceof Error ? error : new Error(`${error}`);
    return new MoralisCoreError({
      code: CoreErrorCode.REQUEST_ERROR,
      message: `Request failed: ${err.message}`,
      cause: err,
    });
  }

  public post<Response, Body extends Record<string, unknown>>(
    url: string,
    searchParams?: Record<string, string>,
    body?: Body,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<Body, Response>({
      url,
      params: searchParams,
      method: 'POST',
      data: body,
      headers: options?.headers,
      signal: abortSignal,
    });
  }

  public put<Response, Body extends Record<string, unknown>>(
    url: string,
    searchParams?: Record<string, string>,
    body?: Body,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<Body, Response>({
      url,
      params: searchParams,
      method: 'PUT',
      data: body,
      headers: options?.headers,
      signal: abortSignal,
    });
  }

  public async get<Response>(
    url: string,
    searchParams?: Record<string, string>,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<unknown, Response>({
      url,
      params: searchParams,
      method: 'GET',
      headers: options?.headers,
      signal: abortSignal,
    });
  }
}
