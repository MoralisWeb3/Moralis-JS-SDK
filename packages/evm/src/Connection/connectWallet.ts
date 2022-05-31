import { EvmBaseConnectOptions } from '@moralisweb3/core';
import { Connectors } from './Connectors';

export const connectWallet = async <Options extends EvmBaseConnectOptions>(
  connectors: Connectors,
  connectorName: string,
  options: Options,
) => {
  const connector = connectors.get(connectorName);
  const data = await connector.connect(options);

  return { ...data, connector };
};
