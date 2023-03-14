import { AptosMoveModuleAbi, AptosMoveModuleAbiInput, AptosMoveModuleAbiJSON } from '../types/AptosMoveModuleAbi';

// $ref: #/components/schemas/WriteModuleData
// type: WriteModuleData
// properties:
// - bytecode ($ref: #/components/schemas/WriteModuleData/properties/bytecode)
// - abi ($ref: #/components/schemas/MoveModuleAbi)

export interface AptosWriteModuleDataJSON {
  readonly bytecode: string;
  readonly abi: AptosMoveModuleAbiJSON;
}

export interface AptosWriteModuleDataInput {
  readonly bytecode: string;
  readonly abi: AptosMoveModuleAbiInput | AptosMoveModuleAbi;
}

export class AptosWriteModuleData {
  public static create(input: AptosWriteModuleDataInput | AptosWriteModuleData): AptosWriteModuleData {
    if (input instanceof AptosWriteModuleData) {
      return input;
    }
    return new AptosWriteModuleData(input);
  }

  public static fromJSON(json: AptosWriteModuleDataJSON): AptosWriteModuleData {
    const input: AptosWriteModuleDataInput = {
      bytecode: json.bytecode,
      abi: AptosMoveModuleAbi.fromJSON(json.abi),
    };
    return AptosWriteModuleData.create(input);
  }

  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly bytecode: string;
  public readonly abi: AptosMoveModuleAbi;

  private constructor(input: AptosWriteModuleDataInput) {
    this.bytecode = input.bytecode;
    this.abi = AptosMoveModuleAbi.create(input.abi);
  }

  public toJSON(): AptosWriteModuleDataJSON {
    return {
      bytecode: this.bytecode,
      abi: this.abi.toJSON(),
    }
  }
}
