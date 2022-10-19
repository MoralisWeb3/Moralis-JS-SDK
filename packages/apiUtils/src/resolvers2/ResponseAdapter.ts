import { MoralisCore } from '@moralisweb3/core';

export class ResponseAdapter<Response, JSONResponse> {
  public constructor(
    private readonly jsonResponse: JSONResponse,
    private readonly deserializeResponse: (jsonResponse: JSONResponse, core: MoralisCore) => Response,
    private readonly core: MoralisCore,
  ) {}

  public get result(): Response {
    return this.deserializeResponse(this.jsonResponse, this.core);
  }

  public get raw(): JSONResponse {
    return this.jsonResponse;
  }

  public toJSON(): JSONResponse {
    return this.jsonResponse;
  }
}
