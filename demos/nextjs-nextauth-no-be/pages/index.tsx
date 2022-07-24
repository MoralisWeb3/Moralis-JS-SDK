import type { NextPage } from 'next';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements/Meta';
import { HomePage } from '../app/components/templates';

const Home: NextPage = () => {
  return (
    <Default>
      <Meta />
      <HomePage />
    </Default>
  );
};

export default Home;
