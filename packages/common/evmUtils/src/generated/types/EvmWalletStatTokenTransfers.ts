// $ref: #/components/schemas/walletStat/properties/token_transfers
// type: walletStat_token_transfers
// properties:
// - total ($ref: #/components/schemas/walletStat/properties/token_transfers/properties/total)

export interface EvmWalletStatTokenTransfersJSON {
  readonly total: string;
}

export interface EvmWalletStatTokenTransfersInput {
  readonly total: string;
}

export class EvmWalletStatTokenTransfers {
  public static create(input: EvmWalletStatTokenTransfersInput | EvmWalletStatTokenTransfers): EvmWalletStatTokenTransfers {
    if (input instanceof EvmWalletStatTokenTransfers) {
      return input;
    }
    return new EvmWalletStatTokenTransfers(input);
  }

  public static fromJSON(json: EvmWalletStatTokenTransfersJSON): EvmWalletStatTokenTransfers {
    const input: EvmWalletStatTokenTransfersInput = {
      total: json.total,
    };
    return EvmWalletStatTokenTransfers.create(input);
  }

  /**
   * @description The number of ERC20 token transfers of a wallet
   */
  public readonly total: string;

  private constructor(input: EvmWalletStatTokenTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmWalletStatTokenTransfersJSON {
    return {
      total: this.total,
    }
  }
}
