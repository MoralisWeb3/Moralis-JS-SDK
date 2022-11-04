import Core, {
  ApiErrorCode,
  MoralisApiError,
  RequestController,
  Operation,
  OperationRequestBody,
  OperationRequestValidator,
  ResponseAdapter,
} from '@moralisweb3/common-core';
import { isNotFoundError } from '../errors/isNotFoundError';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export class NullableOperationResolver<Request, JSONRequest, Response, JSONResponse> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: Operation<Request, JSONRequest, Response, JSONResponse>,
    private readonly baseUrl: string,
    private readonly core: Core,
  ) {
    if (!operation.isNullable) {
      throw new Error(`Operation ${operation.name} has invalid value for isNullable property`);
    }
  }

  public readonly fetch = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse> | null> => {
    this.requestValidator.validate(request);

    try {
      const result = await this._fetch(request);

      // TODO: this block should be deleted after the back-end adjustments.
      if (!result.raw || (typeof result.raw === 'object' && Object.keys(result.raw).length === 0)) {
        throw new MoralisApiError({
          code: ApiErrorCode.NOT_FOUND,
          message: 'The resource is not found',
        });
      }

      return result;
    } catch (e) {
      if (isNotFoundError(e)) {
        return null;
      }
      throw e;
    }
  };

  private async _fetch(request: Request): Promise<ResponseAdapter<Response, JSONResponse>> {
    const { url, urlSearchParams } = this.requestBuilder.prepareUrl(this.baseUrl, request);
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: JSONResponse = await this.requestController.request<OperationRequestBody | null, JSONResponse>({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    return new ResponseAdapter(jsonResponse, () =>
      this.operation.deserializeResponse(jsonResponse, request, this.core),
    );
  }
}
