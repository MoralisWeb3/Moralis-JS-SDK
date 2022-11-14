import { AuthPage } from '../app/components/templates';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import {
  useEvmNFTTrades,
  useEvmTokenPrice,
  useEvmTokenTransfers,
  useEvmWalletTokenBalances,
  useEvmWalletTokenTransfers,
} from '@moralisweb3/next';
import { EvmAddress } from '@moralisweb3/common-evm-utils';

const SignIn: NextPage = () => {
  // const { data } = useEvmTokenPrice({
  //   address: EvmAddress.create('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
  // });
  const { data: transfers } = useEvmNFTTrades({ address: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990' });

  // console.log('tokenPrice: ', data);
  console.log('transfers: ', transfers);
  return (
    <Default>
      <Meta />
      <AuthPage />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default SignIn;
