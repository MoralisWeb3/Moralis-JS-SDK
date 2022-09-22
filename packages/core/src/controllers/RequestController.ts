import { AxiosError, AxiosRequestConfig } from 'axios';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { AxiosRetry, AxiosRetryConfig } from './AxiosRetry';
import { MoralisCore } from '../MoralisCore';
import { LoggerController } from './LoggerController';

export interface RequestOptions {
  headers?: { [name: string]: string };
}

type AxiosApiError = AxiosError<{ message?: string | string[] }> & {
  response: NonNullable<AxiosError<{ message: string | string[] }>['response']>;
};

const isAxiosApiError = (error: unknown): error is AxiosApiError => {
  // Check if the error is an axios error
  if (!(error instanceof AxiosError)) {
    return false;
  }

  // Check if the error is a result of a 400 or 500 response
  if (error.code !== AxiosError.ERR_BAD_REQUEST && error.code !== AxiosError.ERR_BAD_RESPONSE) {
    return false;
  }

  return true;
};

const getApiMessageFromError = (error: AxiosApiError) => {
  const { message } = error.response.data;

  if (Array.isArray(message)) {
    return message.join(', ');
  }

  if (typeof message === 'string') {
    return message;
  }

  return 'Unknown error (no error info returned from API)';
};

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
    if (isAxiosApiError(error)) {
      const { status, statusText } = error.response;
      const apiMessage = getApiMessageFromError(error);

      return new MoralisCoreError({
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

    return new MoralisCoreError({
      code: CoreErrorCode.REQUEST_ERROR,
      message: `Request failed: ${err.message}`,
      cause: err,
    });
  }

  public post<Response, Body extends Record<string, unknown>>(
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

  public put<Response, Body extends Record<string, unknown>>(
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

  public async delete<Response>(
    url: string,
    searchParams?: Record<string, unknown>,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<unknown, Response>({
      url,
      params: searchParams,
      method: 'DELETE',
      headers: options?.headers,
      signal: abortSignal,
    });
  }
}
