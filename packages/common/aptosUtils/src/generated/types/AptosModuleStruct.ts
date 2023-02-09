import { AptosGenericTypeParam, AptosGenericTypeParamInput, AptosGenericTypeParamJSON } from '../types/AptosGenericTypeParam';
import { AptosModuleStructField, AptosModuleStructFieldInput, AptosModuleStructFieldJSON } from '../types/AptosModuleStructField';

// $ref: #/components/schemas/ModuleStruct
// type: ModuleStruct
// properties:
// - name ($ref: #/components/schemas/ModuleStruct/properties/name)
// - is_native ($ref: #/components/schemas/ModuleStruct/properties/is_native)
// - abilities ($ref: #/components/schemas/ModuleStruct/properties/abilities)
// - generic_type_params ($ref: #/components/schemas/GenericTypeParam)
// - fields ($ref: #/components/schemas/ModuleStructField)

export interface AptosModuleStructJSON {
  readonly name: string;
  readonly is_native: boolean;
  readonly abilities: string[];
  readonly generic_type_params: AptosGenericTypeParamJSON[];
  readonly fields: AptosModuleStructFieldJSON[];
}

export interface AptosModuleStructInput {
  readonly name: string;
  readonly isNative: boolean;
  readonly abilities: string[];
  readonly genericTypeParams: AptosGenericTypeParamInput[] | AptosGenericTypeParam[];
  readonly fields: AptosModuleStructFieldInput[] | AptosModuleStructField[];
}

export class AptosModuleStruct {
  public static create(input: AptosModuleStructInput | AptosModuleStruct): AptosModuleStruct {
    if (input instanceof AptosModuleStruct) {
      return input;
    }
    return new AptosModuleStruct(input);
  }

  public static fromJSON(json: AptosModuleStructJSON): AptosModuleStruct {
    const input: AptosModuleStructInput = {
      name: json.name,
      isNative: json.is_native,
      abilities: json.abilities,
      genericTypeParams: json.generic_type_params.map((item) => AptosGenericTypeParam.fromJSON(item)),
      fields: json.fields.map((item) => AptosModuleStructField.fromJSON(item)),
    };
    return AptosModuleStruct.create(input);
  }

  /**
   * @description Name of the struct
   */
  public readonly name: string;
  /**
   * @description Whether the struct is a native struct of Move
   */
  public readonly isNative: boolean;
  /**
   * @description Abilities associated with the struct
   */
  public readonly abilities: string[];
  /**
   * @description Generic types associated with the struct
   */
  public readonly genericTypeParams: AptosGenericTypeParam[];
  /**
   * @description Fields associated with the struct
   */
  public readonly fields: AptosModuleStructField[];

  private constructor(input: AptosModuleStructInput) {
    this.name = input.name;
    this.isNative = input.isNative;
    this.abilities = input.abilities;
    this.genericTypeParams = input.genericTypeParams.map((item) => AptosGenericTypeParam.create(item));
    this.fields = input.fields.map((item) => AptosModuleStructField.create(item));
  }

  public toJSON(): AptosModuleStructJSON {
    return {
      name: this.name,
      is_native: this.isNative,
      abilities: this.abilities,
      generic_type_params: this.genericTypeParams.map((item) => item.toJSON()),
      fields: this.fields.map((item) => item.toJSON()),
    }
  }
}
