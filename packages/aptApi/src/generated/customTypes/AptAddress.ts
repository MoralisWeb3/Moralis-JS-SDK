export type AptAddressJSON = string;
export type AptAddressInput = AptAddressJSON;

export class AptAddress {
  public static create(input: AptAddressInput | AptAddress): AptAddress {
    if (input instanceof AptAddress) {
      return input;
    }
    return new AptAddress(input);
  }

  public static fromJSON(json: AptAddressJSON): AptAddress {
    return new AptAddress(json);
  }

  private constructor(
    public readonly address: string
  ) {
  }

  public toJSON(): AptAddressJSON {
    return this.address;
  }
}
