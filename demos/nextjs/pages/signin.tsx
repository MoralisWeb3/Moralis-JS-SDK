import { AuthPage } from '../app/components/templates';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEvmEndpointWeights, useEvmNativeBalance, useEvmTokenPrice } from '@moralisweb3/next';
import { EvmAddress } from '@moralisweb3/common-evm-utils';

const SignIn: NextPage = () => {
  const { data } = useEvmTokenPrice({
    address: EvmAddress.create('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
  });
  const { data: balance } = useEvmNativeBalance({ address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' });

  const l = useEvmEndpointWeights({});

  console.log('tokenPrice: ', data);
  console.log('balance: ', balance);
  console.log('endps: ', l.data);
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
