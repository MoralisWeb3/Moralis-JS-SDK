import { EvmChain, EvmConnectData } from '@moralisweb3/core';
import Moralis from 'moralis';
import { useState, useCallback, useEffect } from 'react';
import { useResolver } from '../../useResolver';
import { IEvmConnect, IEVMConnectCallbacks } from './types';

export const useEVM = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [chain, setChain] = useState<null | EvmChain>(null);
  const [web3, setWeb3] = useState<null | EvmConnectData>(null);

  // eslint-disable-next-line no-console
  console.log('chain: ', chain);

  const resolver = useResolver();

  useEffect(() => {
    // const handleConnect = ({
    //   web3,
    //   chainId,
    //   account,
    //   connector,
    //   provider,
    // }: {
    //   web3: MoralisType.MoralisWeb3Provider;
    //   chainId: string | null;
    //   account: string | null;
    //   provider: MoralisType.Provider;
    //   connector: MoralisType.Connector;
    // }) => {
    //   setWeb3(web3);
    //   setChainId(chainId);
    //   setAccount(account);
    //   setConnector(connector);
    //   setProvider(provider);
    // };

    // const handleDisconnect = () => {
    //   setWeb3(null);
    //   _setIsWeb3Enabled(false);
    //   setChainId(null);
    //   setAccount(null);
    //   setConnector(null);
    //   setProvider(null);
    // };

    const handleChainChanged = (data: { chain: EvmChain }) => {
      setChain(chain);
      // setWeb3(Moralis.Ev);
    };

    const unsubChainChanged = Moralis.Evm.onChainChanged(handleChainChanged);
    // const unsubAccountChanged = Moralis.onAccountChanged(setAccount);
    // const unsubEnable = Moralis.onWeb3Enabled(handleConnect);
    // const unsubDeactivate = Moralis.onWeb3Deactivated(handleDisconnect);
    // const unsubDisconnect = Moralis.onDisconnect(handleDisconnect);

    return () => {
      unsubChainChanged();
      // unsubAccountChanged();
      // unsubEnable();
      // unsubDeactivate();
      // unsubDisconnect();
    };
  }, [Moralis]);

  const connect = useCallback<IEvmConnect>(
    (connector, { onComplete, onError, onSuccess, throwOnError, ...rest } = {}) => {
      return resolver(
        () => {
          setIsConnecting(true);
          return Moralis.Evm.connect(connector, rest);
        },
        {
          _onComplete: () => setIsConnecting(false),
          // _onError,
          _onSuccess: (data: EvmConnectData) => {
            setIsConnected(true);
            setWeb3(data);
          },
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
          return Moralis.Evm.disconnect();
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

  return { isConnecting, isConnected, isDisconnecting, web3, connect, disconnect };
};
