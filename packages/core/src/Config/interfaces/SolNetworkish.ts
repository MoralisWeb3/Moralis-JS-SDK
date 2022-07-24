/**
 * Note this is just an interface, used in the core config.
 * The implementations are located in the @moralisweb3/sol-utils package.
 */

 export interface SolNetworkable {
    network: string;
  }
  
  export type SolNetworkish = SolNetworkable | string;