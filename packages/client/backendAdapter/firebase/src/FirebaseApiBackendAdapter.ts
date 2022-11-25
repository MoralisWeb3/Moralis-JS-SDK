import { ApiBackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import Core, {
  NextPaginatedRequestResolver,
  Operation,
  PaginatedJSONResponse,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  PaginationReader,
  ResponseAdapter,
} from '@moralisweb3/common-core';
import { httpsCallable, Functions } from '@firebase/functions';

export interface FirebaseApiBackendAdapterOptions {
  functionNamePrefix?: string;
}

export class FirebaseApiBackendAdapter implements ApiBackendAdapter {
  private readonly functionName: string;

  public constructor(
    private readonly functions: Functions,
    private readonly core: Core,
    options: FirebaseApiBackendAdapterOptions | undefined,
  ) {
    const prefix = options?.functionNamePrefix ?? 'ext-moralis-api-';
    this.functionName = `${prefix}call`;
  }

  public async requestOperation<Request, JSONRequest, Response, JSONResponse>(
    callingModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
      request: jsonRequest,
    });

    return new ResponseAdapter(jsonResponse.data, () => {
      return operation.deserializeResponse(jsonResponse.data, request, this.core);
    });
  }

  public async requestNullableOperation<Request, JSONRequest, Response, JSONResponse>(
    callingModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const jsonResponse = await httpsCallable<CallRequest<JSONRequest>, JSONResponse | null>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
      request: jsonRequest,
    });

    if (!jsonResponse.data) {
      return null;
    }
    const data = jsonResponse.data as JSONResponse;
    return new ResponseAdapter<Response, JSONResponse>(data, () => {
      return operation.deserializeResponse(data, request, this.core);
    });
  }

  public async requestPaginatedOperation<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    callingModuleName: string,
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    const jsonRequest = operation.serializeRequest(request, this.core);

    const response = await httpsCallable<CallRequest<JSONRequest>, PaginatedJSONResponse<JSONResult>>(
      this.functions,
      this.functionName,
    )({
      operationName: operation.name,
      moduleName: callingModuleName,
      request: jsonRequest,
    });
    const jsonResponse = response.data;

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(operation, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => operation.deserializeResponse(jsonResponse, request, this.core),
      nextRequest ? () => this.requestPaginatedOperation(callingModuleName, nextRequest, operation) : undefined,
    );
  }
}

interface CallRequest<OperationJSONRequest> {
  operationName: string;
  moduleName: string;
  request: OperationJSONRequest;
}
