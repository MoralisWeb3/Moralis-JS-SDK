// $ref: #/components/schemas/nftTokenStat/properties/transfers
// type: nftTokenStat_transfers
// properties:
// - total ($ref: #/components/schemas/nftTokenStat/properties/transfers/properties/total)

export interface EvmNftTokenStatTransfersJSON {
  readonly total: string;
}

export interface EvmNftTokenStatTransfersInput {
  readonly total: string;
}

export class EvmNftTokenStatTransfers {
  public static create(input: EvmNftTokenStatTransfersInput | EvmNftTokenStatTransfers): EvmNftTokenStatTransfers {
    if (input instanceof EvmNftTokenStatTransfers) {
      return input;
    }
    return new EvmNftTokenStatTransfers(input);
  }

  public static fromJSON(json: EvmNftTokenStatTransfersJSON): EvmNftTokenStatTransfers {
    const input: EvmNftTokenStatTransfersInput = {
      total: json.total,
    };
    return EvmNftTokenStatTransfers.create(input);
  }

  /**
   * @description The number of transfers of the nft token
   */
  public readonly total: string;

  private constructor(input: EvmNftTokenStatTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmNftTokenStatTransfersJSON {
    return {
      total: this.total,
    }
  }
}
