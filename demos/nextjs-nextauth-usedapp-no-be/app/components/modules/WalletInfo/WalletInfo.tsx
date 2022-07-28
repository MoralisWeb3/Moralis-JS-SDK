import { getEllipsisTxt } from '../../../utils/format';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WalletInfo.module.css';
import { useEthers } from '@usedapp/core';

const WalletInfo = () => {
  const { data, status } = useSession();
  const { chainId, deactivate } = useEthers();

  const handleDisconnect = async () => {
    deactivate();
    await signOut({ callbackUrl: '/signin' });
  };

  return (
    <div className={styles.walletInfo__wrapper}>
      {status === 'authenticated' ? (
        <>
          <div className={styles.wallet}>
            <div className={styles.walletInfo}>
              <div>
                <span>{chainId || 'no network'}</span>
              </div>
              <div className={`${styles.status} ${status == 'authenticated' ? styles.active : styles.nonActive}`} />
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
