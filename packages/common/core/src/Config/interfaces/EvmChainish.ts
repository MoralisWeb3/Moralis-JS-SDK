/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/common-evm-utils package.
 */

export interface EvmChainable {
  decimal: number;
  hex: string;
  apiHex: string;
}

export type EvmChainish = EvmChainable | string | number;
