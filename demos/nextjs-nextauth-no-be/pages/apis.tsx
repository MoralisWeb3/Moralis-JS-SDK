import type { NextPage } from 'next';
import { Default } from '../app/components/layouts/Default';
import { Meta } from '../app/components/elements/Meta';

const APIs: NextPage = () => {
  return (
    <Default>
      <Meta />
      <>APIs</>
    </Default>
  );
};

export default APIs;
