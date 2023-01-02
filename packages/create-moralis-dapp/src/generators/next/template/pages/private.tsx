import type { GetServerSideProps, NextPage } from 'next';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements/Meta';
import { getSession } from 'next-auth/react';

const Private: NextPage<{ content: string }> = ({ content }) => {
  return (
    <Default>
      <Meta />
      <span>{content}</span>
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      content: session
        ? "You are authenticated. So you can get my secret now - I'm a mage"
        : 'Authenticate to get my secret',
    },
  };
};

export default Private;
