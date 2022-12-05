import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Profile.module.css';
import { useEvmNativeBalance } from '@moralisweb3/next';
import { EvmChain } from 'moralis/common-evm-utils';

const Profile: FC = () => {
  const { data } = useSession();
  const { fetch } = useEvmNativeBalance();
  const [ethBalance, setEthBalance] = useState('');
  const [bnbBalance, setBnbBalance] = useState('');

  const fetchBalanceForEthereum = async () => {
    const response = await fetch({ address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', chain: EvmChain.ETHEREUM });
    if (response?.balance) {
      setEthBalance(response.balance.ether);
    }
  };

  const fetchBalanceForBsc = async () => {
    const response = await fetch({ address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', chain: EvmChain.BSC });
    if (response?.balance) {
      setBnbBalance(response.balance.ether);
    }
  };

  return (
    <div className={styles.profile}>
      <Image src="/assets/mage.svg" width={46} height={46} alt="profile" />
      <button onClick={fetchBalanceForEthereum}>Fetch Balance For Ethereum</button>
      <button onClick={fetchBalanceForBsc}>Fetch Balance For BSC</button>
      <h4>{data?.user?.address}</h4>
      <p>Profile ID: {data?.user.profileId}</p>
      <p>Ethereum Balance: {ethBalance} Ether</p>
      <p>Binance Balance: {bnbBalance} BNB</p>
    </div>
  );
};

export default Profile;
