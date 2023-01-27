
// $ref: #/components/schemas/tokenItem

export interface AptTokenItemJSON {
  readonly token_address?: string;
  readonly token_id?: string;
}

export interface AptTokenItemInput {
  readonly tokenAddress?: string;
  readonly tokenId?: string;
}

export class AptTokenItem {
  public static create(input: AptTokenItemInput): AptTokenItem {
    return new AptTokenItem(input);
  }

  public static fromJSON(json: AptTokenItemJSON): AptTokenItem {
    const input: AptTokenItemInput = {
      tokenAddress: json.token_address,
      tokenId: json.token_id,
    };
    return AptTokenItem.create(input);
  }

  /**
   * @description The contract address
   */
  public readonly tokenAddress?: string;
  /**
   * @description The id of the token
   */
  public readonly tokenId?: string;

  private constructor(input: AptTokenItemInput) {
    this.tokenAddress = input.tokenAddress;
    this.tokenId = input.tokenId;
  }

  public toJSON(): AptTokenItemJSON {
    return {
      token_address: this.tokenAddress,
      token_id: this.tokenId,
    }
  }
}
