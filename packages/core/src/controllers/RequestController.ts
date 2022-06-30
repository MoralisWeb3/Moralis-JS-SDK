import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { AxiosRetry, AxiosRetryConfig } from './AxiosRetry';
import core from '../MoralisCore';

export interface RequestOptions {
  headers?: { [name: string]: string };
}

/**
 * A controller responsible to handle all requests in Moralis,
 * compatible with browser, nodejJs and react-native
 */
export class RequestController {
  private static async request<Data, Response>(config: AxiosRequestConfig<Data>): Promise<Response> {
    core.logger.verbose('[RequestController] request started', {
      url: config.url,
      method: config.method,
      body: config.data,
    });

    const retryConfig: AxiosRetryConfig = {
      maxAttempts: 2,
      allowedMethods: ['GET', 'OPTIONS'],
      allowedResponseStatuses: [408, 413, 429, 500, 502, 503, 504],
      beforeRetry: (attempt: number, error: AxiosError) => {
        core.logger.verbose('[RequestController] request retry', {
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

      core.logger.verbose('[RequestController] request error', {
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

  private static makeError(error: unknown): MoralisCoreError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return new MoralisCoreError({
        code: CoreErrorCode.REQUEST_ERROR,
        message: `Request failed with status ${axiosError.response?.status}: ${axiosError.message}`,
        cause: error,
        details: {
          status: axiosError.response?.status,
          request: axiosError.request,
          response: axiosError.request,
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

  static post<Response, Params extends Record<string, string>, Body extends Record<string, unknown>>(
    url: string,
    params?: Params,
    body?: Body,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<Body, Response>({
      url,
      method: 'POST',
      data: body,
      params,
      headers: options?.headers,
      signal: abortSignal,
    });
  }

  static put<Response, Params extends Record<string, string>, Body extends Record<string, unknown>>(
    url: string,
    params?: Params,
    body?: Body,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<Body, Response>({
      url,
      method: 'PUT',
      data: body,
      params,
      headers: options?.headers,
      signal: abortSignal,
    });
  }

  static async get<Response, Params extends Record<string, string>>(
    url: string,
    params?: Params,
    options?: RequestOptions,
    abortSignal?: AbortController['signal'],
  ): Promise<Response> {
    return this.request<unknown, Response>({
      url,
      method: 'GET',
      params,
      headers: options?.headers,
      signal: abortSignal,
    });
  }
}
