import MoralisCore from '@moralisweb3/core';

export interface Operation<Request, Response, JSONResponse> {
  name: string;
  groupName: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  urlPathPattern: string;
  urlPathParamNames: (keyof Request)[];
  bodyType?: 'properties' | 'raw';
  bodyParamNames?: (keyof Request)[];
  firstPageIndex?: number;

  parseUrlParams(request: Request, core: MoralisCore): OperationUrlParams;
  parseBody?(request: Request, core: MoralisCore): OperationBody;
  createResponse(jsonResponse: JSONResponse, core: MoralisCore): Response;
}

export type OperationMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type OperationUrlParams = Record<string, string>;
export type OperationBody = OperationPropertiesBody | OperationRawBody;
export type OperationPropertiesBody = Record<string, unknown>;
export type OperationRawBody = string | number | boolean | object;
