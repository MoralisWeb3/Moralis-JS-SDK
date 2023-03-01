// $ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/data
// typeName: GetEventsByCreationNumberResponse_data

export type AptosGetEventsByCreationNumberResponseDataJSON = object;
export type AptosGetEventsByCreationNumberResponseDataInput = object;
export type AptosGetEventsByCreationNumberResponseDataValue = object;

export abstract class AptosGetEventsByCreationNumberResponseData {
  public static create(input: AptosGetEventsByCreationNumberResponseDataInput | AptosGetEventsByCreationNumberResponseDataValue): AptosGetEventsByCreationNumberResponseDataValue {
    return input;
  }

  public static fromJSON(json: AptosGetEventsByCreationNumberResponseDataJSON): AptosGetEventsByCreationNumberResponseDataValue {
    return json;
  }
}
