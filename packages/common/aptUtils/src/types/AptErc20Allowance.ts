
// $ref: #/components/schemas/erc20Allowance

export interface AptErc20AllowanceJSON {
  readonly allowance: string;
}

export interface AptErc20AllowanceInput {
  readonly allowance: string;
}

export class AptErc20Allowance {
  public static create(input: AptErc20AllowanceInput): AptErc20Allowance {
    return new AptErc20Allowance(input);
  }

  public static fromJSON(json: AptErc20AllowanceJSON): AptErc20Allowance {
    const input: AptErc20AllowanceInput = {
      allowance: json.allowance,
    };
    return AptErc20Allowance.create(input);
  }

  /**
   * @description The allowance
   */
  public readonly allowance: string;

  private constructor(input: AptErc20AllowanceInput) {
    this.allowance = input.allowance;
  }

  public toJSON(): AptErc20AllowanceJSON {
    return {
      allowance: this.allowance,
    }
  }
}
