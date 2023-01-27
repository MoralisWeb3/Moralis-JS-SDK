// $ref: #/components/schemas/web3version

export interface AptWeb3versionJSON {
  readonly version: string;
}

export interface AptWeb3versionInput {
  readonly version: string;
}

export class AptWeb3version {
  public static create(input: AptWeb3versionInput): AptWeb3version {
    return new AptWeb3version(input);
  }

  public static fromJSON(json: AptWeb3versionJSON): AptWeb3version {
    const input: AptWeb3versionInput = {
      version: json.version,
    };
    return AptWeb3version.create(input);
  }

  /**
   * @description The version of the API
   */
  public readonly version: string;

  private constructor(input: AptWeb3versionInput) {
    this.version = input.version;
  }

  public toJSON(): AptWeb3versionJSON {
    return {
      version: this.version,
    };
  }
}
