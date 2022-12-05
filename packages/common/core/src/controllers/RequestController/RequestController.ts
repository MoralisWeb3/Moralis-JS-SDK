import { AxiosError, AxiosRequestConfig } from 'axios';
import { CoreErrorCode, CoreError } from '../../Error';
import { AxiosRetry, AxiosRetryConfig } from '../AxiosRetry';
import { Core } from '../../Core';
import { LoggerController } from '../LoggerController';
import { getMessageFromApiRequestError, isApiRequestError } from './ApiRequestError';

export interface RequestOptions {
  headers?: { [name: string]: string };
}

/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
export class RequestController {
  public static create(core: Core): RequestController {
    return new RequestController(core.logger);
  }

  private constructor(private readonly logger: LoggerController) {}

  public async request<Data, Response>(config: AxiosRequestConfig<Data>): Promise<Response> {
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
      const response = await AxiosRetry.request<Data, Response>(retryConfig, {
        ...config,
        timeout: 20000,
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

  private makeError(error: unknown): CoreError {
    if (isApiRequestError(error)) {
      const { status, statusText } = error.response;
      const apiMessage = getMessageFromApiRequestError(error);

      return new CoreError({
        code: CoreErrorCode.REQUEST_ERROR,
        message: `Request failed, ${statusText}(${status}): ${apiMessage}`,
        cause: error,
        details: {
          status,
          response: error.response,
        },
      });
    }

    const err = error instanceof Error ? error : new Error(`${error}`);

    return new CoreError({
      code: CoreErrorCode.REQUEST_ERROR,
      message: `Request failed: ${err.message}`,
      cause: err,
    });
  }

  public post<Response, Body>(
    url: string,
    searchParams?: Record<string, unknown>,
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

  public put<Response, Body>(
    url: string,
    searchParams?: Record<string, unknown>,
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
    searchParams?: Record<string, unknown>,
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

  public async delete<Response, Body>(
    url: string,
    searchParams?: Record<string, unknown>,
    body?: Body,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<unknown, Response>({
      url,
      params: searchParams,
      method: 'DELETE',
      data: body,
      headers: options?.headers,
      signal: abortSignal,
    });
  }
}
