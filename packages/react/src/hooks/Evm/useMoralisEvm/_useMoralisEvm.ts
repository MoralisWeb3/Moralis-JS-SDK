import { AnyConnector, EvmAddress, EvmChain, EvmConnectionData, EvmProvider, MoralisError } from '@moralisweb3/core';
import { IConnectParams } from './types';
import { IDefaultCallbacks } from '../../types';
import { useResolver } from '../../useResolver';
import { useState, useCallback, useEffect } from 'react';
import Evm from '@moralisweb3/evm';

export const _useMoralisEvm = () => {
  const resolver = useResolver();
  const [account, setAccount] = useState<null | EvmAddress>(null);
  const [chain, setChain] = useState<null | EvmChain>(null);
  const [connector, setConnector] = useState<null | AnyConnector>(null);
  const [error, setError] = useState<MoralisError | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [provider, setProvider] = useState<null | EvmProvider>(null);
  // eslint-disable-next-line no-console
  console.log('isConnectedisConnected: ', isConnected);
  useEffect(() => {
    const handleConnect = ({ chain, account, connector, provider }: EvmConnectionData) => {
      setChain(chain);
      setAccount(account);
      setConnector(connector);
      setProvider(provider);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setChain(null);
      setAccount(null);
      setConnector(null);
      setProvider(null);
    };

    const handleChainChanged = (chain: EvmChain) => {
      setChain(chain);
    };

    const unsubAccountChanged = Evm.onAccountChanged(({ account }) => setAccount(account));
    const unsubChainChanged = Evm.onChainChanged(({ chain }) => handleChainChanged(chain));
    const unsubConnect = Evm.onConnected(handleConnect);
    const unsubDisconnect = Evm.onDisconnected(handleDisconnect);

    return () => {
      unsubAccountChanged();
      unsubChainChanged();
      unsubConnect();
      unsubDisconnect();
    };
  }, [Evm]);

  const connect = useCallback<IConnectParams>(
    (connector, { onComplete, onError, onSuccess, throwOnError = true, ...rest } = {}) => {
      return resolver(
        () => {
          setIsConnecting(true);
          return Evm.connect(connector, rest);
        },
        {
          _onComplete: () => setIsConnecting(false),
          _onError: setError,
          _onSuccess: () => setIsConnected(true),
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  const disconnect = useCallback(
    async ({ onComplete, onError, onSuccess, throwOnError = true }: IDefaultCallbacks<void> = {}) => {
      return resolver(
        () => {
          setIsDisconnecting(true);
          return Evm.disconnect();
        },
        {
          _onComplete: () => setIsDisconnecting(false),
          _onError: setError,
          _onSuccess: () => setIsConnected(false),
          onComplete,
          onError,
          onSuccess,
          throwOnError,
        },
      );
    },
    [],
  );

  return {
    isConnecting,
    isConnected,
    isDisconnecting,
    chain,
    connect,
    disconnect,
    account,
    connector,
    provider,
    error,
  };
};
