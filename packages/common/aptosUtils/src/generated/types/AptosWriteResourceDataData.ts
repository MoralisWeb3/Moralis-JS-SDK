// $ref: #/components/schemas/WriteResourceData/properties/data
// typeName: WriteResourceData_data

export type AptosWriteResourceDataDataJSON = object;
export type AptosWriteResourceDataDataInput = object;
export type AptosWriteResourceDataDataValue = object;

export abstract class AptosWriteResourceDataData {
  public static create(input: AptosWriteResourceDataDataInput | AptosWriteResourceDataDataValue): AptosWriteResourceDataDataValue {
    return input;
  }

  public static fromJSON(json: AptosWriteResourceDataDataJSON): AptosWriteResourceDataDataValue {
    return json;
  }
}
