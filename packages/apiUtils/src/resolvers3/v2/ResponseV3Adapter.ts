export class ResponseV3Adapter<Response, ResponseJSON> {
  public constructor(public readonly result: Response, private readonly json: ResponseJSON) {}

  /**
   * @deprecated Use `toJSON()` method from the result.
   */
  public get raw(): ResponseJSON {
    return this.json;
  }

  /**
   * @deprecated Use `toJSON()` method from the result.
   */
  public toJSON(): ResponseJSON {
    return this.json;
  }
}
