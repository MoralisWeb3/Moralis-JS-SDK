import { AptosGenericTypeParam, AptosGenericTypeParamInput, AptosGenericTypeParamJSON } from '../types/AptosGenericTypeParam';

// $ref: #/components/schemas/ModuleExposedFunction
// type: ModuleExposedFunction
// properties:
// - name ($ref: #/components/schemas/ModuleExposedFunction/properties/name)
// - visibility ($ref: #/components/schemas/ModuleExposedFunction/properties/visibility)
// - is_entry ($ref: #/components/schemas/ModuleExposedFunction/properties/is_entry)
// - generic_type_params ($ref: #/components/schemas/GenericTypeParam)
// - params ($ref: #/components/schemas/ModuleExposedFunction/properties/params)
// - return ($ref: #/components/schemas/ModuleExposedFunction/properties/return)

export interface AptosModuleExposedFunctionJSON {
  readonly name: string;
  readonly visibility: string;
  readonly is_entry: boolean;
  readonly generic_type_params: AptosGenericTypeParamJSON[];
  readonly params: string[];
  readonly return: string[];
}

export interface AptosModuleExposedFunctionInput {
  readonly name: string;
  readonly visibility: string;
  readonly isEntry: boolean;
  readonly genericTypeParams: AptosGenericTypeParamInput[] | AptosGenericTypeParam[];
  readonly params: string[];
  readonly return: string[];
}

export class AptosModuleExposedFunction {
  public static create(input: AptosModuleExposedFunctionInput | AptosModuleExposedFunction): AptosModuleExposedFunction {
    if (input instanceof AptosModuleExposedFunction) {
      return input;
    }
    return new AptosModuleExposedFunction(input);
  }

  public static fromJSON(json: AptosModuleExposedFunctionJSON): AptosModuleExposedFunction {
    const input: AptosModuleExposedFunctionInput = {
      name: json.name,
      visibility: json.visibility,
      isEntry: json.is_entry,
      genericTypeParams: json.generic_type_params.map((item) => AptosGenericTypeParam.fromJSON(item)),
      params: json.params,
      return: json.return,
    };
    return AptosModuleExposedFunction.create(input);
  }

  /**
   * @description Name of the function
   */
  public readonly name: string;
  /**
   * @description Move function visibility
   */
  public readonly visibility: string;
  /**
   * @description Whether the function can be called as an entry function directly in a transaction
   */
  public readonly isEntry: boolean;
  /**
   * @description Generic type params associated with the Move function
   */
  public readonly genericTypeParams: AptosGenericTypeParam[];
  /**
   * @description Parameters associated with the move function
   */
  public readonly params: string[];
  /**
   * @description Return type of the function
   */
  public readonly return: string[];

  private constructor(input: AptosModuleExposedFunctionInput) {
    this.name = input.name;
    this.visibility = input.visibility;
    this.isEntry = input.isEntry;
    this.genericTypeParams = input.genericTypeParams.map((item) => AptosGenericTypeParam.create(item));
    this.params = input.params;
    this.return = input.return;
  }

  public toJSON(): AptosModuleExposedFunctionJSON {
    return {
      name: this.name,
      visibility: this.visibility,
      is_entry: this.isEntry,
      generic_type_params: this.genericTypeParams.map((item) => item.toJSON()),
      params: this.params,
      return: this.return,
    }
  }
}
