import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { useEvmApiGetNativeBalance } from '@moralisweb3/next';

const Profile: FC = () => {
  const { data } = useSession();
  const { data: balance, error } = useEvmApiGetNativeBalance({ address: '0x3D7258055be449b11AfFF0A5eAddbd6e278C1916' });
  console.log({ balance, error });
  return (
    <div className={styles.profile}>
      {/* <button
        onClick={async () => {
          const newData = await mutate({
            address: '0x259DB2fD041d370e803f4D44951bE0E4722b7a45',
            chain: 
          });
          console.log('newData: ', newData);
        }}
      >
        mutate
      </button> */}
      <Image src="/assets/mage.svg" width={46} height={46} alt="profile" />
      <h4>{data?.user.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Session Expiration Time: {data?.user.expirationTime}</p>
    </div>
  );
};

export default Profile;
