import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { useEvmBlock, useEvmTokenBalances } from '@moralisweb3/next';

const Profile: FC = () => {
  const { data } = useSession();
  const { data: block } = useEvmBlock({
    blockNumberOrHash: '100000',
  });

  const { data: balance } = useEvmTokenBalances({ address: '0x259DB2fD041d370e803f4D44951bE0E4722b7a45' });
  console.log('block: ');
  console.log('balance: ', balance && balance[0].token);

  return (
    <div className={styles.profile}>
      <Image src="/assets/mage.svg" width={46} height={46} alt="profile" />
      <h4>{data?.user.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Session Expiration Time: {data?.user.expirationTime}</p>
    </div>
  );
};

export default Profile;
