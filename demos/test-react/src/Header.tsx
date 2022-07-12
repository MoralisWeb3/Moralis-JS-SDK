import { useMoralisEvm } from '@moralisweb3/react';

const Header = () => {
  const { chain } = useMoralisEvm();
  return <div>Chain: {chain?.name}</div>;
};

export default Header;
