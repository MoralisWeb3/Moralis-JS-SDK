import { MoralisData, MoralisDataFormatted } from './abstract';

export type SolNetworkName = 'mainnet' | 'devnet';
export type SolNetworkNameish = SolNetworkName | string;

export type SolNetworkish = SolNetwork | SolNetworkNameish;

export class SolNetwork implements MoralisData {
  public static create(network: SolNetworkish): SolNetwork {
    return network instanceof SolNetwork ? network : new SolNetwork(SolNetwork.parse(network));
  }

  private static parse(network: SolNetworkNameish): SolNetworkName {
    // TODO: add network validation
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
