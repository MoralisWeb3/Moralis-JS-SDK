import { AptosWriteResourceDataData, AptosWriteResourceDataDataValue, AptosWriteResourceDataDataInput, AptosWriteResourceDataDataJSON } from '../types/AptosWriteResourceDataData';

// $ref: #/components/schemas/WriteResourceData
// type: WriteResourceData
// properties:
// - type ($ref: #/components/schemas/WriteResourceData/properties/type)
// - data ($ref: #/components/schemas/WriteResourceData/properties/data)

export interface AptosWriteResourceDataJSON {
  readonly type: string;
  readonly data: AptosWriteResourceDataDataJSON;
}

export interface AptosWriteResourceDataInput {
  readonly type: string;
  readonly data: AptosWriteResourceDataDataInput | AptosWriteResourceDataDataValue;
}

export class AptosWriteResourceData {
  public static create(input: AptosWriteResourceDataInput | AptosWriteResourceData): AptosWriteResourceData {
    if (input instanceof AptosWriteResourceData) {
      return input;
    }
    return new AptosWriteResourceData(input);
  }

  public static fromJSON(json: AptosWriteResourceDataJSON): AptosWriteResourceData {
    const input: AptosWriteResourceDataInput = {
      type: json.type,
      data: AptosWriteResourceDataData.fromJSON(json.data),
    };
    return AptosWriteResourceData.create(input);
  }

  /**
   * @description String representation of a MoveStructTag (on-chain Move struct type).
   */
  public readonly type: string;
  /**
   * @description This is a JSON representation of some data within an account resource. More specifically, it is a map of strings to arbitrary JSON values / objects, where the keys are top level fields within the given resource.
   */
  public readonly data: AptosWriteResourceDataDataValue;

  private constructor(input: AptosWriteResourceDataInput) {
    this.type = input.type;
    this.data = AptosWriteResourceDataData.create(input.data);
  }

  public toJSON(): AptosWriteResourceDataJSON {
    return {
      type: this.type,
      data: this.data,
    }
  }
}
