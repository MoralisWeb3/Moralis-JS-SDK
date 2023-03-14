// $ref: #/components/schemas/MultiEd25519SignatureRequest
// type: MultiEd25519SignatureRequest
// properties:
// - type ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/type)
// - public_keys ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/public_keys)
// - signatures ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/signatures)
// - threshold ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/threshold)
// - bitmap ($ref: #/components/schemas/MultiEd25519SignatureRequest/properties/bitmap)

export interface AptosMultiEd25519SignatureRequestJSON {
  readonly type: string;
  readonly public_keys: string[];
  readonly signatures: string[];
  readonly threshold: number;
  readonly bitmap: string;
}

export interface AptosMultiEd25519SignatureRequestInput {
  readonly type: string;
  readonly publicKeys: string[];
  readonly signatures: string[];
  readonly threshold: number;
  readonly bitmap: string;
}

export class AptosMultiEd25519SignatureRequest {
  public static create(input: AptosMultiEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequest): AptosMultiEd25519SignatureRequest {
    if (input instanceof AptosMultiEd25519SignatureRequest) {
      return input;
    }
    return new AptosMultiEd25519SignatureRequest(input);
  }

  public static fromJSON(json: AptosMultiEd25519SignatureRequestJSON): AptosMultiEd25519SignatureRequest {
    const input: AptosMultiEd25519SignatureRequestInput = {
      type: json.type,
      publicKeys: json.public_keys,
      signatures: json.signatures,
      threshold: json.threshold,
      bitmap: json.bitmap,
    };
    return AptosMultiEd25519SignatureRequest.create(input);
  }

  public static isInput(input: any): input is AptosMultiEd25519SignatureRequestInput {
    return ["type","publicKeys","signatures","threshold","bitmap"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosMultiEd25519SignatureRequestJSON {
    return ["type","public_keys","signatures","threshold","bitmap"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description The public keys for the Ed25519 signature
   */
  public readonly publicKeys: string[];
  /**
   * @description Signature associated with the public keys in the same order
   */
  public readonly signatures: string[];
  /**
   * @description The number of signatures required for a successful transaction
   */
  public readonly threshold: number;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly bitmap: string;

  private constructor(input: AptosMultiEd25519SignatureRequestInput) {
    this.type = input.type;
    this.publicKeys = input.publicKeys;
    this.signatures = input.signatures;
    this.threshold = input.threshold;
    this.bitmap = input.bitmap;
  }

  public toJSON(): AptosMultiEd25519SignatureRequestJSON {
    return {
      type: this.type,
      public_keys: this.publicKeys,
      signatures: this.signatures,
      threshold: this.threshold,
      bitmap: this.bitmap,
    }
  }
}
