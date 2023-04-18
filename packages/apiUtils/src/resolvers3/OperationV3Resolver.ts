import { ApiErrorCode, Core, CoreConfig, MoralisApiError, RequestController } from '@moralisweb3/common-core';
import { OperationV3 } from './OperationV3';
import { getSdkDetailsHeaders } from '../resolvers2';
import { ApiUtilsConfig } from '../config';
import { ResponseV3Adapter } from './v2/ResponseV3Adapter';

export type BaseUrlOrResolver<Request> = string | ((request: Request) => string);

export class OperationV3Resolver<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON> {
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
    private readonly baseUrl: BaseUrlOrResolver<Request>,
    private readonly core: Core,
  ) {}

  public async request(request: Request, body: Body): Promise<{ response: Response; responseJson: ResponseJSON }> {
    const urlParamNames = this.operation.parameterNames.filter((name) =>
      this.operation.routePattern.includes(`{${name}}`),
    );
    const requestJSON: Record<string, unknown> = this.operation.serializeRequest
      ? (this.operation.serializeRequest(request) as Record<string, unknown>)
      : {};

    const url = urlParamNames.reduce((current, name) => {
      const value = requestJSON[name];
      current = current.replace(`{${name}}`, String(value));
      return current;
    }, this.operation.routePattern);

    const searchParams = this.operation.parameterNames
      .filter((name) => !urlParamNames.includes(name))
      .reduce((current, name) => {
        current[name] = requestJSON[name];
        return current;
      }, {} as Record<string, unknown>);

    const bodyJSON = body && this.operation.serializeBody ? this.operation.serializeBody(body) : undefined;

    const responseJson = await this.requestController.request<unknown, ResponseJSON>({
      url,
      params: searchParams,
      baseURL: this.resolveBaseUrl(request),
      method: this.operation.httpMethod,
      data: bodyJSON,
      headers: this.prepareHeaders(),
    });

    if (!responseJson || !this.operation.parseResponse) {
      if (this.operation.hasResponse) {
        throw new Error('Expected response, but API has returned empty response');
      }
      // TODO: find a better way to handle this
      return {
        response: null as Response,
        responseJson: null as ResponseJSON,
      };
    }

    return {
      response: this.operation.parseResponse(responseJson),
      responseJson,
    };
  }

  public async resolve(request: Request, body: Body): Promise<Response> {
    return (await this.request(request, body)).response;
  }

  /**
   * @deprecated This method is dedicated to V2 API only.
   */
  public async fetch(request: Request, body: Body): Promise<ResponseV3Adapter<Response, ResponseJSON>> {
    const data = await this.request(request, body);
    return new ResponseV3Adapter(data.response, data.responseJson);
  }

  private resolveBaseUrl(request: Request): string {
    return typeof this.baseUrl === 'string' ? this.baseUrl : this.baseUrl(request);
  }

  private prepareHeaders(): Record<string, string> {
    const apiKey = this.core.config.get(ApiUtilsConfig.apiKey);
    const product = this.core.config.get(CoreConfig.product);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getSdkDetailsHeaders();
    headers['x-api-key'] = `${apiKey}`;
    headers['Authorization'] = `Bearer ${apiKey}`;
    if (product) {
      headers['x-moralis-product'] = product;
    }
    return headers;
  }
}
