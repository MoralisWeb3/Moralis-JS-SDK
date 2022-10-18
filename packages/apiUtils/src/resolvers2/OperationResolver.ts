import MoralisCore, { ApiErrorCode, MoralisApiError, RequestController } from '@moralisweb3/core';
import { ApiConfig } from '../config';
import { getCommonHeaders } from '../resolvers/getCommonHeaders';
import { Operation, OperationBody } from './Operation';
import { OperationRequestBuilder } from './OperationRequestBuilder';
import { ResponseAdapter } from './ResponseAdapter';

export class OperationResolver<Request, Response, JSONResponse> {
  private readonly requestBuilder = new OperationRequestBuilder<Request>(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: Operation<Request, Response, JSONResponse>,
    private readonly baseUrl: string,
    private readonly core: MoralisCore,
  ) {}

  public readonly fetch = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse>> => {
    const { urlPath, urlSearchParams } = this.requestBuilder.prepareUrl(request);
    const url = `${this.baseUrl}${urlPath}`;
    const body = this.requestBuilder.prepareBody(request);

    let jsonResponse: JSONResponse;
    switch (this.operation.method) {
      // TODO: requestController should have the `request` method with the `method` parameter.
      case 'GET':
        jsonResponse = await this.requestController.get<JSONResponse>(url, urlSearchParams, {
          headers: this.getHeaders(),
        });
        break;
      case 'POST':
        jsonResponse = await this.requestController.post<JSONResponse, OperationBody>(
          url,
          urlSearchParams,
          body as OperationBody,
          {
            headers: this.getHeaders(),
          },
        );
        break;
      case 'PUT':
        jsonResponse = await this.requestController.put<JSONResponse, OperationBody>(
          url,
          urlSearchParams,
          body as OperationBody,
          {
            headers: this.getHeaders(),
          },
        );
        break;
      case 'DELETE':
        jsonResponse = await this.requestController.delete<JSONResponse, OperationBody>(
          url,
          urlSearchParams,
          body as OperationBody,
          {
            headers: this.getHeaders(),
          },
        );
        break;
      default:
        throw new Error(`Method ${this.operation.method} is not supported`);
    }

    return new ResponseAdapter(jsonResponse, this.operation.createResponse, this.core);
  };

  private getHeaders() {
    const apiKey = this.core.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getCommonHeaders();
    headers['x-api-key'] = apiKey;
    return headers;
  }
}
