// $ref: #/components/schemas/GetEventsByEventHandleResponse/properties/data
// typeName: GetEventsByEventHandleResponse_data

export type AptosGetEventsByEventHandleResponseDataJSON = object;
export type AptosGetEventsByEventHandleResponseDataInput = AptosGetEventsByEventHandleResponseDataJSON;

export class AptosGetEventsByEventHandleResponseData {
  public static create(input: AptosGetEventsByEventHandleResponseDataInput | AptosGetEventsByEventHandleResponseData) {
    if (input instanceof AptosGetEventsByEventHandleResponseData) {
      return input;
    }
    return new AptosGetEventsByEventHandleResponseData(input);
  }

  public static fromJSON(json: AptosGetEventsByEventHandleResponseDataJSON) {
    return new AptosGetEventsByEventHandleResponseData(json);
  }

  public constructor(public readonly value: AptosGetEventsByEventHandleResponseDataInput) {}

  public toJSON(): AptosGetEventsByEventHandleResponseDataJSON {
    return this.value;
  }
}
