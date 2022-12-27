import { EvmConnector } from './EvmConnector';

export interface EvmAuthClientOptions {
  /**
   * @description Custom Ethereum wallet connectors.
   */
  connectors?: EvmConnector[];
}
