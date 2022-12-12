import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { useEvmNativeBalance } from '@moralisweb3/next';

const Profile: FC = () => {
  const { data } = useSession();
  const { data: balance } = useEvmNativeBalance({ address: data?.user?.address });
  return (
    <div className={styles.profile}>
      <Image src="/assets/mage.svg" width={46} height={46} alt="profile" />
      <h4>{data?.user?.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Native Balance: {balance?.balance.ether} Ether</p>
    </div>
  );
};

export default Profile;
