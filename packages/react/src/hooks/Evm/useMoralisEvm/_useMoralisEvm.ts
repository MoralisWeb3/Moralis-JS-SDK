/* eslint-disable no-console */
import { AnyConnector, EvmAddress, EvmChain, EvmConnectData, EvmProvider } from '@moralisweb3/core';
import Evm from '@moralisweb3/evm';
import { useState, useCallback, useEffect } from 'react';
import { useResolver } from '../../useResolver';
import { IEvmConnect, IEVMConnectCallbacks } from './types';

export const _useMoralisEvm = () => {
  const resolver = useResolver();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chain, setChain] = useState<null | EvmChain>(null);
  const [account, setAccount] = useState<null | EvmAddress>(null);
  const [connector, setConnector] = useState<null | AnyConnector>(null);
  const [provider, setProvider] = useState<null | EvmProvider>(null);

  useEffect(() => {
    const handleConnect = ({ chain, account, connector, provider }: EvmConnectData) => {
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

  const connect = useCallback<IEvmConnect>(
    (connector, { onComplete, onError, onSuccess, throwOnError, ...rest } = {}) => {
      return resolver(
        () => {
          setIsConnecting(true);
          return Evm.connect(connector, rest);
        },
        {
          _onComplete: () => setIsConnecting(false),
          // _onError,
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
    async ({ onComplete, onError, onSuccess, throwOnError }: IEVMConnectCallbacks = {}) => {
      return resolver(
        () => {
          setIsDisconnecting(true);
          return Evm.disconnect();
        },
        {
          _onComplete: () => setIsDisconnecting(false),
          // _onError,
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

  return { isConnecting, isConnected, isDisconnecting, chain, connect, disconnect, account, connector, provider };
};
