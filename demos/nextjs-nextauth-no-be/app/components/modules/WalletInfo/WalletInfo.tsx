import Image from 'next/image';
import styles from './WalletInfo.module.css';

const WalletInfo = () => {
  return (
    <div className={styles.walletInfo__wrapper}>
      <div className={styles.wallet}>
        <div className={styles.walletInfo}>
          <span>0x1</span>
          <div className={styles.connected} />
          <span>0x3d72...8c1916</span>
        </div>
        <button className={styles.disconnectButton}>Disconnect</button>
      </div>
      <Image src="/assets/mage.svg" width={34} height={34} alt="profile" />
    </div>
  );
};

export default WalletInfo;
