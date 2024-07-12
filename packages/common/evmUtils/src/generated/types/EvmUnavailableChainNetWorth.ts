// $ref: #/components/schemas/unavailableChainNetWorth
// type: unavailableChainNetWorth
// properties:
// - chain_id ($ref: #/components/schemas/unavailableChainNetWorth/properties/chain_id)

export interface EvmUnavailableChainNetWorthJSON {
  readonly chain_id: string;
}

export interface EvmUnavailableChainNetWorthInput {
  readonly chainId: string;
}

export class EvmUnavailableChainNetWorth {
  public static create(input: EvmUnavailableChainNetWorthInput | EvmUnavailableChainNetWorth): EvmUnavailableChainNetWorth {
    if (input instanceof EvmUnavailableChainNetWorth) {
      return input;
    }
    return new EvmUnavailableChainNetWorth(input);
  }

  public static fromJSON(json: EvmUnavailableChainNetWorthJSON): EvmUnavailableChainNetWorth {
    const input: EvmUnavailableChainNetWorthInput = {
      chainId: json.chain_id,
    };
    return EvmUnavailableChainNetWorth.create(input);
  }

  /**
   * @description The chain id
   */
  public readonly chainId: string;

  private constructor(input: EvmUnavailableChainNetWorthInput) {
    this.chainId = input.chainId;
  }

  public toJSON(): EvmUnavailableChainNetWorthJSON {
    return {
      chain_id: this.chainId,
    }
  }
}
