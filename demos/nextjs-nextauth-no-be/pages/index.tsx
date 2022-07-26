import type { GetServerSideProps, NextPage } from 'next';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements/Meta';
import { UserPage } from '../app/components/templates';
import { getSession } from 'next-auth/react';

const User: NextPage = () => {
  return (
    <Default>
      <Meta />
      <UserPage />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default User;
