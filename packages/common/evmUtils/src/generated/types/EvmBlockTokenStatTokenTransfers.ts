// $ref: #/components/schemas/blockTokenStat/properties/token_transfers
// type: blockTokenStat_token_transfers
// properties:
// - total ($ref: #/components/schemas/blockTokenStat/properties/token_transfers/properties/total)

export interface EvmBlockTokenStatTokenTransfersJSON {
  readonly total: string;
}

export interface EvmBlockTokenStatTokenTransfersInput {
  readonly total: string;
}

export class EvmBlockTokenStatTokenTransfers {
  public static create(input: EvmBlockTokenStatTokenTransfersInput | EvmBlockTokenStatTokenTransfers): EvmBlockTokenStatTokenTransfers {
    if (input instanceof EvmBlockTokenStatTokenTransfers) {
      return input;
    }
    return new EvmBlockTokenStatTokenTransfers(input);
  }

  public static fromJSON(json: EvmBlockTokenStatTokenTransfersJSON): EvmBlockTokenStatTokenTransfers {
    const input: EvmBlockTokenStatTokenTransfersInput = {
      total: json.total,
    };
    return EvmBlockTokenStatTokenTransfers.create(input);
  }

  /**
   * @description The number of ERC20 token transfers made in a block
   */
  public readonly total: string;

  private constructor(input: EvmBlockTokenStatTokenTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmBlockTokenStatTokenTransfersJSON {
    return {
      total: this.total,
    }
  }
}
