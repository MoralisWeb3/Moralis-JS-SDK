
// $ref: #/components/schemas/ens

export interface AptEnsJSON {
  readonly name: string;
}

export interface AptEnsInput {
  readonly name: string;
}

export class AptEns {
  public static create(input: AptEnsInput): AptEns {
    return new AptEns(input);
  }

  public static fromJSON(json: AptEnsJSON): AptEns {
    const input: AptEnsInput = {
      name: json.name,
    };
    return AptEns.create(input);
  }

  /**
   * @description Resolved ENS address
   */
  public readonly name: string;

  private constructor(input: AptEnsInput) {
    this.name = input.name;
  }

  public toJSON(): AptEnsJSON {
    return {
      name: this.name,
    }
  }
}
