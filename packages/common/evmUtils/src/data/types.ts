/**
 * Moralis representation of a native chain currency.
 */
export interface EvmNativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface EvmChainListDataEntry {
  name: string;
  title?: string;
  chain: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: EvmNativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  network?: string;
  networkId: number;
  slip44?: number;
  ens?: {
    registry: string;
  };
  explorers?: {
    name: string;
    url: string;
    standard: 'EIP3091' | 'none';
    icon?: string;
  }[];
  parent?: {
    type: 'L2' | 'shard';
    chain:
      | 'eip155-3'
      | 'eip155-4'
      | 'eip155-5'
      | 'eip155-90'
      | 'eip155-100'
      | 'eip155-1'
      | 'eip155-100'
      | 'eip155-250'
      | 'eip155-248'
      | 'eip155-43114'
      | 'eip155-900'
      | 'eip155-43113'
      | 'eip155-100000'
      | 'eip155-110000'
      | 'eip155-2099156'
      | 'eip155-16658437';
    bridges?: {
      url: string;
    }[];
  };
  status?: 'deprecated' | 'incubating' | 'active';
  features?: EvmChainFeature[];
  redFlags?: string[];
}

export interface EvmChainFeature {
  name: string;
}
