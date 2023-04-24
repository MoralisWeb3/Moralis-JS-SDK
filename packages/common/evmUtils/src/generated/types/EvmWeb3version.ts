// $ref: #/components/schemas/web3version
// type: web3version
// properties:
// - version ($ref: #/components/schemas/web3version/properties/version)

export interface EvmWeb3versionJSON {
  readonly version: string;
}

export interface EvmWeb3versionInput {
  readonly version: string;
}

export class EvmWeb3version {
  public static create(input: EvmWeb3versionInput | EvmWeb3version): EvmWeb3version {
    if (input instanceof EvmWeb3version) {
      return input;
    }
    return new EvmWeb3version(input);
  }

  public static fromJSON(json: EvmWeb3versionJSON): EvmWeb3version {
    const input: EvmWeb3versionInput = {
      version: json.version,
    };
    return EvmWeb3version.create(input);
  }

  /**
   * @description The version of the API
   */
  public readonly version: string;

  private constructor(input: EvmWeb3versionInput) {
    this.version = input.version;
  }

  public toJSON(): EvmWeb3versionJSON {
    return {
      version: this.version,
    }
  }
}
