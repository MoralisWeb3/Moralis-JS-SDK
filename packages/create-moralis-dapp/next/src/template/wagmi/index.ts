export const config = {
  dependencies: { wagmi: '0.12.2', ethers: '5.7.2' },
  pages: {
    _app: {
      imports: [
        `import { WagmiConfig, configureChains, createClient } from 'wagmi';
        import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
        import { publicProvider } from 'wagmi/providers/public';
        import { InjectedConnector } from 'wagmi/connectors/injected'`,
      ],
      config: [
        `const { chains, provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()])`,
        { id: 'connectors', code: `const connectors = [new InjectedConnector()]` },
        `const wagmiClient = createClient({
            autoConnect: true,
            connectors,
            provider,
        })`,
      ],
      wrappers: [[`<WagmiConfig client={wagmiClient}>`], [`</WagmiConfig>`]],
    },
    home: {
      imports: [`import { useAccount } from 'wagmi';`],
      config: [
        `const { address } = useAccount();
            useEffect(() => {
                if (!address) {
                    return;
                }
                setEvmAddress(address);
            }, [address]);`,
      ],
    },
  },
};
