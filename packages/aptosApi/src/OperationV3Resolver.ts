import { ApiUtilsConfig, getCommonHeaders } from '@moralisweb3/api-utils';
import { ApiErrorCode, Config, CoreConfig, MoralisApiError, RequestController } from '@moralisweb3/common-core';
import { OperationV3 } from './generated/abstractClient';

export class OperationV3Resolver {
  public constructor(
    private readonly baseUrl: string,
    private readonly config: Config,
    private readonly requestController: RequestController,
  ) {}

  public async resolve<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    request: Request,
    body: Body | null,
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
  ): Promise<Response> {
    const urlParamNames = operation.parameterNames.filter((name) => operation.routePattern.includes(`{${name}}`));
    const requestJSON: Record<string, unknown> = operation.serializeRequest
      ? (operation.serializeRequest(request) as Record<string, unknown>)
      : {};

    const url = urlParamNames.reduce((current, name) => {
      const value = requestJSON[name];
      current = current.replace(`{${name}}`, String(value));
      return current;
    }, operation.routePattern);

    const searchParams = operation.parameterNames
      .filter((name) => !urlParamNames.includes(name))
      .reduce((current, name) => {
        current[name] = requestJSON[name];
        return current;
      }, {} as Record<string, unknown>);

    const bodyJSON = body && operation.serializeBody ? operation.serializeBody(body) : undefined;

    const responseJSON = await this.requestController.request<unknown, ResponseJSON>({
      url,
      params: searchParams,
      baseURL: this.baseUrl,
      method: operation.httpMethod,
      data: bodyJSON,
      headers: this.prepareHeaders(),
    });

    if (!responseJSON || !operation.parseResponse) {
      if (operation.hasResponse) {
        throw new Error('Expected response, but API has returned empty response');
      }
      return null as Response;
    }
    return operation.parseResponse(responseJSON);
  }

  public prepareHeaders(): Record<string, string> {
    const apiKey = this.config.get(ApiUtilsConfig.apiKey);
    const product = this.config.get(CoreConfig.product);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getCommonHeaders();
    headers['Authorization'] = `Bearer ${apiKey}`;
    if (product) {
      headers['x-moralis-product'] = product;
    }
    return headers;
  }
}
