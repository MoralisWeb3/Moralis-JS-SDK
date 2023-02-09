import { AptosModuleExposedFunction, AptosModuleExposedFunctionInput, AptosModuleExposedFunctionJSON } from '../types/AptosModuleExposedFunction';
import { AptosModuleStruct, AptosModuleStructInput, AptosModuleStructJSON } from '../types/AptosModuleStruct';

// $ref: #/components/schemas/MoveModuleAbi
// type: MoveModuleAbi
// properties:
// - address ($ref: #/components/schemas/MoveModuleAbi/properties/address)
// - name ($ref: #/components/schemas/MoveModuleAbi/properties/name)
// - friends ($ref: #/components/schemas/MoveModuleAbi/properties/friends)
// - exposed_functions ($ref: #/components/schemas/ModuleExposedFunction)
// - structs ($ref: #/components/schemas/ModuleStruct)

export interface AptosMoveModuleAbiJSON {
  readonly address: string;
  readonly name: string;
  readonly friends: string[];
  readonly exposed_functions: AptosModuleExposedFunctionJSON[];
  readonly structs: AptosModuleStructJSON[];
}

export interface AptosMoveModuleAbiInput {
  readonly address: string;
  readonly name: string;
  readonly friends: string[];
  readonly exposedFunctions: AptosModuleExposedFunctionInput[] | AptosModuleExposedFunction[];
  readonly structs: AptosModuleStructInput[] | AptosModuleStruct[];
}

export class AptosMoveModuleAbi {
  public static create(input: AptosMoveModuleAbiInput | AptosMoveModuleAbi): AptosMoveModuleAbi {
    if (input instanceof AptosMoveModuleAbi) {
      return input;
    }
    return new AptosMoveModuleAbi(input);
  }

  public static fromJSON(json: AptosMoveModuleAbiJSON): AptosMoveModuleAbi {
    const input: AptosMoveModuleAbiInput = {
      address: json.address,
      name: json.name,
      friends: json.friends,
      exposedFunctions: json.exposed_functions.map((item) => AptosModuleExposedFunction.fromJSON(item)),
      structs: json.structs.map((item) => AptosModuleStruct.fromJSON(item)),
    };
    return AptosMoveModuleAbi.create(input);
  }

  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly address: string;
  public readonly name: string;
  /**
   * @description Friends of the module
   */
  public readonly friends: string[];
  /**
   * @description Public functions of the module
   */
  public readonly exposedFunctions: AptosModuleExposedFunction[];
  /**
   * @description Structs of the module
   */
  public readonly structs: AptosModuleStruct[];

  private constructor(input: AptosMoveModuleAbiInput) {
    this.address = input.address;
    this.name = input.name;
    this.friends = input.friends;
    this.exposedFunctions = input.exposedFunctions.map((item) => AptosModuleExposedFunction.create(item));
    this.structs = input.structs.map((item) => AptosModuleStruct.create(item));
  }

  public toJSON(): AptosMoveModuleAbiJSON {
    return {
      address: this.address,
      name: this.name,
      friends: this.friends,
      exposed_functions: this.exposedFunctions.map((item) => item.toJSON()),
      structs: this.structs.map((item) => item.toJSON()),
    }
  }
}
