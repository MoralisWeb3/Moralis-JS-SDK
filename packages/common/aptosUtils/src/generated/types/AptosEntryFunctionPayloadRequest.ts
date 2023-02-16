// $ref: #/components/schemas/EntryFunctionPayloadRequest
// type: EntryFunctionPayloadRequest
// properties:
// - type ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/type)
// - function ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/function)
// - type_arguments ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/type_arguments)
// - arguments ($ref: #/components/schemas/EntryFunctionPayloadRequest/properties/arguments)

export interface AptosEntryFunctionPayloadRequestJSON {
  readonly type: string;
  readonly function: string;
  readonly type_arguments: string[];
  readonly arguments: string[];
}

export interface AptosEntryFunctionPayloadRequestInput {
  readonly type: string;
  readonly function: string;
  readonly typeArguments: string[];
  readonly arguments: string[];
}

export class AptosEntryFunctionPayloadRequest {
  public static create(input: AptosEntryFunctionPayloadRequestInput | AptosEntryFunctionPayloadRequest): AptosEntryFunctionPayloadRequest {
    if (input instanceof AptosEntryFunctionPayloadRequest) {
      return input;
    }
    return new AptosEntryFunctionPayloadRequest(input);
  }

  public static fromJSON(json: AptosEntryFunctionPayloadRequestJSON): AptosEntryFunctionPayloadRequest {
    const input: AptosEntryFunctionPayloadRequestInput = {
      type: json.type,
      function: json.function,
      typeArguments: json.type_arguments,
      arguments: json.arguments,
    };
    return AptosEntryFunctionPayloadRequest.create(input);
  }

  public static isInput(input: any): input is AptosEntryFunctionPayloadRequestInput {
    return ["type","function","typeArguments","arguments"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosEntryFunctionPayloadRequestJSON {
    return ["type","function","type_arguments","arguments"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description Entry function id is string representation of a entry function defined on-chain.
   */
  public readonly function: string;
  /**
   * @description Type arguments of the function
   */
  public readonly typeArguments: string[];
  /**
   * @description Arguments of the function
   */
  public readonly arguments: string[];

  private constructor(input: AptosEntryFunctionPayloadRequestInput) {
    this.type = input.type;
    this.function = input.function;
    this.typeArguments = input.typeArguments;
    this.arguments = input.arguments;
  }

  public toJSON(): AptosEntryFunctionPayloadRequestJSON {
    return {
      type: this.type,
      function: this.function,
      type_arguments: this.typeArguments,
      arguments: this.arguments,
    }
  }
}
