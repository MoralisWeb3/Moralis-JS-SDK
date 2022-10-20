import MoralisCore, {
  ApiErrorCode,
  MoralisApiError,
  RequestController,
  Operation,
  OperationRequestBody,
  OperationRequestValidator,
} from '@moralisweb3/core';
import { isNotFoundError } from '../errors/isNotFoundError';
import { OperationRequestBuilder } from './OperationRequestBuilder';
import { ResponseAdapter } from './ResponseAdapter';

export class OperationResolver<Request, JSONRequest, Response, JSONResponse> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.core);
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly operation: Operation<Request, JSONRequest, Response, JSONResponse>,
    private readonly baseUrl: string,
    private readonly core: MoralisCore,
  ) {}

  public readonly fetch = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse>> => {
    this.requestValidator.validate(request);

    const { urlPath, urlSearchParams } = this.requestBuilder.prepareUrl(request);
    const url = `${this.baseUrl}${urlPath}`;
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
  };

  public readonly fetchNullable = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse> | null> => {
    try {
      const result = await this.fetch(request);

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
}
