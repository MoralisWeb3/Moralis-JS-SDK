import { MoralisCore } from '@moralisweb3/core';

export class ResponseAdapter<Response, JSONResponse> {
  public constructor(
    private readonly jsonResponse: JSONResponse,
    private readonly createResponse: (jsonResponse: JSONResponse, core: MoralisCore) => Response,
    private readonly core: MoralisCore,
  ) {}

  public get result(): Response {
    return this.createResponse(this.jsonResponse, this.core);
  }

  public get raw(): JSONResponse {
    return this.jsonResponse;
  }

  public toJSON(): JSONResponse {
    return this.jsonResponse;
  }
}
