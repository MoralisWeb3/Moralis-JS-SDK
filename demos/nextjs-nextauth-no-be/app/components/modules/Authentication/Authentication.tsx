import { Option } from '../../elements';
import styles from './Authentication.module.css';

const wallets = [
  {
    name: 'Metamask',
    logoPath: '/assets/wallets/metamask.svg',
  },
  {
    name: 'Coinbase Wallet',
    logoPath: '/assets/wallets/coinbase.svg',
  },
  {
    name: 'WalletConnect',
    logoPath: '/assets/wallets/walletconnect.svg',
  },
  {
    name: 'Injected',
    logoPath: '/assets/wallets/eth.svg',
  },
];
const Authentication = () => {
  return (
    <div className={styles.auth}>
      <h3 className={styles.title}>Web3 Authentication</h3>
      <div className={styles.options}>
        {wallets.map(({ name, logoPath }) => (
          <Option name={name} logoPath={logoPath} key={name} />
        ))}
      </div>
    </div>
  );
};

export default Authentication;
