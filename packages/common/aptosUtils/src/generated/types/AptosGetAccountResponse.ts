// $ref: #/components/schemas/GetAccountResponse
// type: GetAccountResponse
// properties:
// - sequence_number ($ref: #/components/schemas/GetAccountResponse/properties/sequence_number)
// - authentication_key ($ref: #/components/schemas/GetAccountResponse/properties/authentication_key)

export interface AptosGetAccountResponseJSON {
  readonly sequence_number: string;
  readonly authentication_key: string;
}

export interface AptosGetAccountResponseInput {
  readonly sequenceNumber: string;
  readonly authenticationKey: string;
}

export class AptosGetAccountResponse {
  public static create(input: AptosGetAccountResponseInput | AptosGetAccountResponse): AptosGetAccountResponse {
    if (input instanceof AptosGetAccountResponse) {
      return input;
    }
    return new AptosGetAccountResponse(input);
  }

  public static fromJSON(json: AptosGetAccountResponseJSON): AptosGetAccountResponse {
    const input: AptosGetAccountResponseInput = {
      sequenceNumber: json.sequence_number,
      authenticationKey: json.authentication_key,
    };
    return AptosGetAccountResponse.create(input);
  }

  /**
   * @description A string containing a 64-bit unsigned integer.
   * We represent u64 values as a string to ensure compatibility with languages such as JavaScript that do not parse u64s in JSON natively.
   */
  public readonly sequenceNumber: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   * Unlike the Address type, HexEncodedBytes will not trim any zeros.
   */
  public readonly authenticationKey: string;

  private constructor(input: AptosGetAccountResponseInput) {
    this.sequenceNumber = input.sequenceNumber;
    this.authenticationKey = input.authenticationKey;
  }

  public toJSON(): AptosGetAccountResponseJSON {
    return {
      sequence_number: this.sequenceNumber,
      authentication_key: this.authenticationKey,
    }
  }
}
