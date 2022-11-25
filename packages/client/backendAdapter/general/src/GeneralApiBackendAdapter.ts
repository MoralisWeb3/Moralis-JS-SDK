import { ApiBackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import {
  Core,
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
} from '@moralisweb3/common-core';

export class GeneralApiBackendAdapter implements ApiBackendAdapter {
  public constructor(protected readonly baseUrl: string, protected readonly core: Core) {}

  public async requestOperation<Request, JSONRequest, Response, JSONResponse>(
    _: string,
    __: Request,
    ___: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public async requestNullableOperation<Request, JSONRequest, Response, JSONResponse>(
    _: string,
    __: Request,
    ___: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public async requestPaginatedOperation<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    _: string,
    __: Request,
    ___: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }
}
