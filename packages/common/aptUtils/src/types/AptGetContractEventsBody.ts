// $ref: #/paths/~1{address}~1events/post/requestBody/content/application~1json/schema

export type AptGetContractEventsBodyJSON = object;
export type AptGetContractEventsBodyInput = AptGetContractEventsBodyJSON;

export class AptGetContractEventsBody {
  public static create(input: AptGetContractEventsBodyInput) {
    return new AptGetContractEventsBody(input);
  }

  public static fromJSON(json: AptGetContractEventsBodyJSON) {
    return new AptGetContractEventsBody(json);
  }

  public constructor(public readonly value: AptGetContractEventsBodyInput) {}

  public toJSON(): AptGetContractEventsBodyJSON {
    return this.value;
  }
}
