/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/common-sol-utils package.
 */

export const solNetworkNames = ['mainnet', 'devnet'] as const;

export type SolNetworkName = typeof solNetworkNames[number];

export interface SolNetworkable {
  network: SolNetworkName;
}

export type SolNetworkish = SolNetworkable | string;
