import { ApiConfig, EndpointDescriptor } from '@moralisweb3/api-utils';
import { AxiosRetry, Config } from '@moralisweb3/core';
import { FirebaseFunctionData } from './ApiProxy';

export class EndpointProxy {
  public constructor(private readonly baseUrl: string, private readonly config: Config) {}

  public async handler(descriptor: EndpointDescriptor, data: FirebaseFunctionData) {
    const apiKey = this.config.get(ApiConfig.apiKey) as string;

    let url = this.baseUrl + descriptor.urlPattern;
    descriptor.urlPatternParamNames.forEach((name) => {
      url = url.replace(`{${name}}`, String(data[name]));
    });

    const searchParams: Record<string, unknown> = {};
    const bodyParams: Record<string, unknown> = {};
    Object.keys(data).forEach((key) => {
      if (descriptor.bodyParamNames.includes(key)) {
        bodyParams[key] = data[key];
      } else if (!descriptor.urlPatternParamNames.includes(key)) {
        searchParams[key] = data[key];
      }
    });

    const headers: { [key: string]: string } = {
      'x-api-key': apiKey,
    };

    const response = await AxiosRetry.request<unknown, unknown>(
      {
        maxAttempts: 2,
        allowedMethods: ['GET', 'OPTIONS'],
        allowedResponseStatuses: [408, 413, 429, 500, 502, 503, 504],
      },
      {
        url,
        method: descriptor.method,
        headers,
        params: searchParams,
        data: bodyParams,
      },
    );
    return response.data;
  }
}
