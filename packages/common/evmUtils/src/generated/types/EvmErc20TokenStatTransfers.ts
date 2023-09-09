// $ref: #/components/schemas/erc20TokenStat/properties/transfers
// type: erc20TokenStat_transfers
// properties:
// - total ($ref: #/components/schemas/erc20TokenStat/properties/transfers/properties/total)

export interface EvmErc20TokenStatTransfersJSON {
  readonly total: string;
}

export interface EvmErc20TokenStatTransfersInput {
  readonly total: string;
}

export class EvmErc20TokenStatTransfers {
  public static create(input: EvmErc20TokenStatTransfersInput | EvmErc20TokenStatTransfers): EvmErc20TokenStatTransfers {
    if (input instanceof EvmErc20TokenStatTransfers) {
      return input;
    }
    return new EvmErc20TokenStatTransfers(input);
  }

  public static fromJSON(json: EvmErc20TokenStatTransfersJSON): EvmErc20TokenStatTransfers {
    const input: EvmErc20TokenStatTransfersInput = {
      total: json.total,
    };
    return EvmErc20TokenStatTransfers.create(input);
  }

  /**
   * @description The number of transfers of the token
   */
  public readonly total: string;

  private constructor(input: EvmErc20TokenStatTransfersInput) {
    this.total = input.total;
  }

  public toJSON(): EvmErc20TokenStatTransfersJSON {
    return {
      total: this.total,
    }
  }
}
