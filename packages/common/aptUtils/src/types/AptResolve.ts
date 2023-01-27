
// $ref: #/components/schemas/resolve

export interface AptResolveJSON {
  readonly address: string;
}

export interface AptResolveInput {
  readonly address: string;
}

export class AptResolve {
  public static create(input: AptResolveInput): AptResolve {
    return new AptResolve(input);
  }

  public static fromJSON(json: AptResolveJSON): AptResolve {
    const input: AptResolveInput = {
      address: json.address,
    };
    return AptResolve.create(input);
  }

  /**
   * @description Resolved domain address
   */
  public readonly address: string;

  private constructor(input: AptResolveInput) {
    this.address = input.address;
  }

  public toJSON(): AptResolveJSON {
    return {
      address: this.address,
    }
  }
}
