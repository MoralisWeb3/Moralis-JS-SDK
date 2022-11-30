import { getEllipsisTxt } from '../../../utils/format';
import { signOut, useSession } from 'next-auth/react';
import { useDisconnect, useNetwork } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WalletInfo.module.css';

const WalletInfo = () => {
  const { data, status } = useSession();
  const { disconnectAsync } = useDisconnect();
  const { chain } = useNetwork();

  const handleDisconnect = async () => {
    await disconnectAsync();
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <div className={styles.walletInfo__wrapper}>
      {status === 'authenticated' ? (
        <>
          <div className={styles.wallet}>
            <div className={styles.walletInfo}>
              <div>
                <span>{chain?.name || 'no network'}</span>
              </div>
              <div className={`${styles.status} ${status === 'authenticated' ? styles.active : styles.nonActive}`} />
              <span>{getEllipsisTxt(data?.user.address)}</span>
            </div>
            <button className={styles.disconnectButton} onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
          <Image src="/assets/mage.svg" width={34} height={34} alt="profile" />
        </>
      ) : (
        <Link href="/signin">
          <a className={styles.authenticate}>Authenticate</a>
        </Link>
      )}
    </div>
  );
};

export default WalletInfo;
