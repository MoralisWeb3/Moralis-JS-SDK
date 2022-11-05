import { Camelize, toCamelCase } from '../../utils';

export class ResponseAdapter<Response, JSONResponse> {
  public constructor(private readonly jsonResponse: JSONResponse, private readonly getResponse: () => Response) {}

  public get result(): Response {
    return this.getResponse();
  }

  public get raw(): JSONResponse {
    return this.jsonResponse;
  }

  public toJSON(): Camelize<JSONResponse> {
    return toCamelCase(this.jsonResponse as Record<string, unknown>) as Camelize<JSONResponse>;
  }
}
