export const imports = `
import { RainbowKitProvider, Theme, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import merge from 'lodash.merge';
`;

export const config = `
const { chains, provider } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const rainbowTheme: Theme = merge(darkTheme(), {
  colors: {
      connectButtonBackground: '#19212c',
  },
});
`
