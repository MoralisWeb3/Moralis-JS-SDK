// $ref: #/components/schemas/GenericTypeParam
// type: GenericTypeParam
// properties:
// - constraints ($ref: #/components/schemas/GenericTypeParam/properties/constraints)

export interface AptosGenericTypeParamJSON {
  readonly constraints: string[];
}

export interface AptosGenericTypeParamInput {
  readonly constraints: string[];
}

export class AptosGenericTypeParam {
  public static create(input: AptosGenericTypeParamInput | AptosGenericTypeParam): AptosGenericTypeParam {
    if (input instanceof AptosGenericTypeParam) {
      return input;
    }
    return new AptosGenericTypeParam(input);
  }

  public static fromJSON(json: AptosGenericTypeParamJSON): AptosGenericTypeParam {
    const input: AptosGenericTypeParamInput = {
      constraints: json.constraints,
    };
    return AptosGenericTypeParam.create(input);
  }

  /**
   * @description Move abilities tied to the generic type param and associated with the function that uses it
   */
  public readonly constraints: string[];

  private constructor(input: AptosGenericTypeParamInput) {
    this.constraints = input.constraints;
  }

  public toJSON(): AptosGenericTypeParamJSON {
    return {
      constraints: this.constraints,
    }
  }
}
