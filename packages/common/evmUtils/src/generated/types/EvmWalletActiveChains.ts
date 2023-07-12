import { EvmWalletActiveChain, EvmWalletActiveChainInput, EvmWalletActiveChainJSON } from '../types/EvmWalletActiveChain';

// $ref: #/components/schemas/walletActiveChains
// type: walletActiveChains
// properties:
// - address ($ref: #/components/schemas/walletActiveChains/properties/address)
// - active_chains ($ref: #/components/schemas/walletActiveChain)

export interface EvmWalletActiveChainsJSON {
  readonly address: string;
  readonly active_chains: EvmWalletActiveChainJSON[];
}

export interface EvmWalletActiveChainsInput {
  readonly address: string;
  readonly activeChains: EvmWalletActiveChainInput[] | EvmWalletActiveChain[];
}

export class EvmWalletActiveChains {
  public static create(input: EvmWalletActiveChainsInput | EvmWalletActiveChains): EvmWalletActiveChains {
    if (input instanceof EvmWalletActiveChains) {
      return input;
    }
    return new EvmWalletActiveChains(input);
  }

  public static fromJSON(json: EvmWalletActiveChainsJSON): EvmWalletActiveChains {
    const input: EvmWalletActiveChainsInput = {
      address: json.address,
      activeChains: json.active_chains.map((item) => EvmWalletActiveChain.fromJSON(item)),
    };
    return EvmWalletActiveChains.create(input);
  }

  /**
   * @description The address of the wallet
   */
  public readonly address: string;
  public readonly activeChains: EvmWalletActiveChain[];

  private constructor(input: EvmWalletActiveChainsInput) {
    this.address = input.address;
    this.activeChains = input.activeChains.map((item) => EvmWalletActiveChain.create(item));
  }

  public toJSON(): EvmWalletActiveChainsJSON {
    return {
      address: this.address,
      active_chains: this.activeChains.map((item) => item.toJSON()),
    }
  }
}
