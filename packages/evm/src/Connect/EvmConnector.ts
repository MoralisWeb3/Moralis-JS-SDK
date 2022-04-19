import { InvokeCallback } from 'xstate';
import {
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
  EvmConnectData,
  EvmConnectOptions,
  EvmConnectorName,
  Logger,
} from '@moralis/core';
import core from '@moralis/core';

/**
 * Returns a connector based on the provided name.
 * It wil dynamically import the correct connector
 */
export async function getConnector(_name?: EvmConnectorName) {
  const name = _name ?? core.config.get('defaultEvmConnector');

  // TODO: remove dynamic import, and let user install dependency themself??? OR inlcude in umbrella package?
  // TODO: OR test properly and make typesafe
  switch (name) {
    case 'metamask':
      //@ts-ignore
      return import('@moralis/evm-metamask-connector')
        .then(({ EvmMetamaskConnector }) => new EvmMetamaskConnector())
        .catch(() => console.log('Missing optional dependency'));

    case 'walletConnect':
      //@ts-ignore
      return import('@moralis/evm-wallet-connect-connector')
        .then(({ EvmWalletconnectConnector }) => new EvmWalletconnectConnector())
        .catch(() => console.log('Missing optional dependency'));

    default:
      throw new MoralisNetworkConnectorError({
        code: NetworkConnectorErrorCode.INVALID_CONNECTOR,
        message: `Provided connector "${name}" does not exist.`,
      });
  }
}

/**
 * Creates a callback invoker that can be consumer by xState.
 */
export const createConnectEvmCallback =
  (
    { walletType, options }: EvmConnectOptions,
    logger: Logger,
  ): InvokeCallback<
    any,
    { type: 'CONNECTING_SUCCESS'; data: EvmConnectData } | { type: 'CONNECTING_ERROR'; data: Error }
  > =>
  (callback, onReceive) => {
    logger.verbose(`Connecting to evm with "${walletType}"`);

    getConnector(walletType)
      .then((connector) => {
        // TODO: make validation to make sure options are correct?
        //@ts-ignore
        connector.connect(options).then(({ provider, account, chain }) => {
          callback({
            type: 'CONNECTING_SUCCESS',
            data: {
              provider,
              account,
              chain,
              connector,
            },
          });
        });
      })
      .catch((error: Error) => {
        callback({
          type: 'CONNECTING_ERROR',
          data: error,
        });
      });

    // TODO: return a clean up fucntion to cancel the connect/import reqests
  };
