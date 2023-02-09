// $ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/data
// typeName: GetEventsByCreationNumberResponse_data

export type AptosGetEventsByCreationNumberResponseDataJSON = object;
export type AptosGetEventsByCreationNumberResponseDataInput = AptosGetEventsByCreationNumberResponseDataJSON;

export class AptosGetEventsByCreationNumberResponseData {
  public static create(input: AptosGetEventsByCreationNumberResponseDataInput | AptosGetEventsByCreationNumberResponseData) {
    if (input instanceof AptosGetEventsByCreationNumberResponseData) {
      return input;
    }
    return new AptosGetEventsByCreationNumberResponseData(input);
  }

  public static fromJSON(json: AptosGetEventsByCreationNumberResponseDataJSON) {
    return new AptosGetEventsByCreationNumberResponseData(json);
  }

  public constructor(public readonly value: AptosGetEventsByCreationNumberResponseDataInput) {}

  public toJSON(): AptosGetEventsByCreationNumberResponseDataJSON {
    return this.value;
  }
}
