// $ref: #/components/schemas/Ed25519SignatureRequest
// type: Ed25519SignatureRequest
// properties:
// - type ($ref: #/components/schemas/Ed25519SignatureRequest/properties/type)
// - signature ($ref: #/components/schemas/Ed25519SignatureRequest/properties/signature)
// - public_key ($ref: #/components/schemas/Ed25519SignatureRequest/properties/public_key)

export interface AptosEd25519SignatureRequestJSON {
  readonly type: string;
  readonly signature: string;
  readonly public_key: string;
}

export interface AptosEd25519SignatureRequestInput {
  readonly type: string;
  readonly signature: string;
  readonly publicKey: string;
}

export class AptosEd25519SignatureRequest {
  public static create(input: AptosEd25519SignatureRequestInput | AptosEd25519SignatureRequest): AptosEd25519SignatureRequest {
    if (input instanceof AptosEd25519SignatureRequest) {
      return input;
    }
    return new AptosEd25519SignatureRequest(input);
  }

  public static fromJSON(json: AptosEd25519SignatureRequestJSON): AptosEd25519SignatureRequest {
    const input: AptosEd25519SignatureRequestInput = {
      type: json.type,
      signature: json.signature,
      publicKey: json.public_key,
    };
    return AptosEd25519SignatureRequest.create(input);
  }

  public static isInput(input: any): input is AptosEd25519SignatureRequestInput {
    return ["type","signature","publicKey"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosEd25519SignatureRequestJSON {
    return ["type","signature","public_key"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte
   */
  public readonly signature: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly publicKey: string;

  private constructor(input: AptosEd25519SignatureRequestInput) {
    this.type = input.type;
    this.signature = input.signature;
    this.publicKey = input.publicKey;
  }

  public toJSON(): AptosEd25519SignatureRequestJSON {
    return {
      type: this.type,
      signature: this.signature,
      public_key: this.publicKey,
    }
  }
}
