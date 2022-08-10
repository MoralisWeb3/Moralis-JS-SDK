import { MoralisData, MoralisDataFormatted, CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';

const solNetworkNames = ['mainnet', 'devnet'] as const;

export type SolNetworkName = typeof solNetworkNames[number];
export type SolNetworkNameish = SolNetworkName | string;

export type SolNetworkish = SolNetwork | SolNetworkNameish;

export class SolNetwork implements MoralisData {
  public static create(network: SolNetworkish): SolNetwork {
    return network instanceof SolNetwork ? network : new SolNetwork(SolNetwork.parse(network));
  }

  private static parse(network: SolNetworkNameish): SolNetworkName {
    if (typeof network === 'string') {
      if (!solNetworkNames.includes(network as SolNetworkName)) {
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: `Solana network is not supported: ${network}`,
        });
      }
    }
    return network as SolNetworkName;
  }

  private constructor(public readonly network: SolNetworkName) {}

  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.network;
  }

  public equals(network: SolNetwork): boolean {
    return this.network === network.network;
  }

  public toJSON(): string {
    return this.network;
  }

  public toString(): string {
    return this.network;
  }
}
