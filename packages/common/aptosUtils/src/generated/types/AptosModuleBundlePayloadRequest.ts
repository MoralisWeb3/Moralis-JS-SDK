// $ref: #/components/schemas/ModuleBundlePayloadRequest
// type: ModuleBundlePayloadRequest
// properties:
// - type ($ref: #/components/schemas/ModuleBundlePayloadRequest/properties/type)
// - modules ($ref: #/components/schemas/ModuleBundlePayloadRequest/properties/modules)

export interface AptosModuleBundlePayloadRequestJSON {
  readonly type: string;
  readonly modules: string[];
}

export interface AptosModuleBundlePayloadRequestInput {
  readonly type: string;
  readonly modules: string[];
}

export class AptosModuleBundlePayloadRequest {
  public static create(input: AptosModuleBundlePayloadRequestInput | AptosModuleBundlePayloadRequest): AptosModuleBundlePayloadRequest {
    if (input instanceof AptosModuleBundlePayloadRequest) {
      return input;
    }
    return new AptosModuleBundlePayloadRequest(input);
  }

  public static fromJSON(json: AptosModuleBundlePayloadRequestJSON): AptosModuleBundlePayloadRequest {
    const input: AptosModuleBundlePayloadRequestInput = {
      type: json.type,
      modules: json.modules,
    };
    return AptosModuleBundlePayloadRequest.create(input);
  }

  public static isInput(input: any): input is AptosModuleBundlePayloadRequestInput {
    return ["type","modules"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosModuleBundlePayloadRequestJSON {
    return ["type","modules"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  public readonly modules: string[];

  private constructor(input: AptosModuleBundlePayloadRequestInput) {
    this.type = input.type;
    this.modules = input.modules;
  }

  public toJSON(): AptosModuleBundlePayloadRequestJSON {
    return {
      type: this.type,
      modules: this.modules,
    }
  }
}
