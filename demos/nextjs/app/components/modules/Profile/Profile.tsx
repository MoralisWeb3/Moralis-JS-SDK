import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { useNativeBalance } from '../../../../pages/api/moralis/useNativeBalance';
// import { useNetwork } from 'wagmi';

const Profile: FC = () => {
  const { data } = useSession();
  // // const { chain } = useNetwork();
  // console.log(chain);
  const {
    data: balance,
    error,
    isValidating,
  } = useNativeBalance({
    address: '0x259DB2fD041d370e803f4D44951bE0E4722b7a45',
    // chain: chain?.id,
  });
  console.log('balance:', balance);
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
