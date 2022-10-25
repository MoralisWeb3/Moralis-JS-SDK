export class ResponseAdapter<Response, JSONResponse> {
  public constructor(private readonly jsonResponse: JSONResponse, private readonly getResponse: () => Response) {}

  public get result(): Response {
    return this.getResponse();
  }

  public get raw(): JSONResponse {
    return this.jsonResponse;
  }

  public toJSON(): JSONResponse {
    return this.jsonResponse;
  }
}
