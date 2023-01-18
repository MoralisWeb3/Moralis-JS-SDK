import { ApiClient } from '@moralisweb3/client-backend-adapter-utils';
import {
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
  RequestController,
  OperationRequestBody,
  Core,
  PaginationReader,
  NextPaginatedRequestResolver,
  PaginatedJSONResponse,
} from '@moralisweb3/common-core';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export interface ExpressApiClientOptions {
  solana?: {
    /**
     * Relative path to access the SolanaApi Router
     * @default '/solana-api'
     * @example '/web3/moralis-api/solana'
     */
    relativePath?: string;
  };
  evm?: {
    /**
     * Relative path to access the EvmApi Router
     * @default '/evm-api'
     * @example '/web3/moralis-api/evm'
     */
    relativePath?: string;
  };
}

export class ExpressApiClient implements ApiClient {
  private readonly requestController = RequestController.create(this.core);

  public constructor(
    private readonly core: Core,
    private readonly baseUrl: string,
    private readonly options?: ExpressApiClientOptions,
  ) {}

  public async request<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    const requestBuilder = new OperationRequestBuilder(operation, this.core);

    const { url, urlSearchParams } = requestBuilder.prepareUrl(
      this.baseUrl,
      getRelativePath(backendModuleName, this.options),
      request,
    );
    const body = requestBuilder.prepareBody(request);

    const jsonResponse: JSONResponse = await this.requestController.request<OperationRequestBody | null, JSONResponse>({
      method: operation.method,
      url,
      params: urlSearchParams,
      withCredentials: true,
      data: body,
    });

    return new ResponseAdapter(jsonResponse, () => operation.deserializeResponse(jsonResponse, request, this.core));
  }

  public async requestNullable<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    const requestBuilder = new OperationRequestBuilder(operation, this.core);

    const { url, urlSearchParams } = requestBuilder.prepareUrl(
      this.baseUrl,
      getRelativePath(backendModuleName, this.options),
      request,
    );
    const body = requestBuilder.prepareBody(request);

    const jsonResponse: JSONResponse | null = await this.requestController.request<
      OperationRequestBody | null,
      JSONResponse | null
    >({
      method: operation.method,
      url,
      params: urlSearchParams,
      withCredentials: true,
      data: body,
    });

    if (!jsonResponse) {
      return null;
    }

    return new ResponseAdapter(jsonResponse, () => operation.deserializeResponse(jsonResponse, request, this.core));
  }

  public async requestPaginated<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    backendModuleName: string,
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    const requestBuilder = new OperationRequestBuilder(operation, this.core);

    const { url, urlSearchParams } = requestBuilder.prepareUrl(
      this.baseUrl,
      getRelativePath(backendModuleName, this.options),
      request,
    );
    const body = requestBuilder.prepareBody(request);

    const jsonResponse = await this.requestController.request<
      OperationRequestBody | null,
      PaginatedJSONResponse<JSONResult>
    >({
      method: operation.method,
      url,
      params: urlSearchParams,
      withCredentials: true,
      data: body,
    });

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(operation.firstPageIndex, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.requestPaginated(backendModuleName, nextRequest, operation) : undefined,
    );
  }
}

const getRelativePath = (backendModuleName: string, options?: ExpressApiClientOptions) => {
  const defaultRouterPath = `/${backendModuleName}`;

  if (!options) {
    return defaultRouterPath;
  }

  let relativePath;

  switch (backendModuleName) {
    case 'evm-api':
      relativePath = options.evm?.relativePath || defaultRouterPath;
      break;
    case 'sol-api':
      relativePath = options.solana?.relativePath || defaultRouterPath;
      break;
    default:
      throw new Error(`The ${backendModuleName} backendModuleName is not supported`);
  }

  return relativePath;
};
