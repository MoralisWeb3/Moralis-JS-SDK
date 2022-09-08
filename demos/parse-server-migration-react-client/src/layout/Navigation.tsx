import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ children, to }: { children: string; to: string }) => {
  return (
    <Button variant="ghost" as={Link} to={to} fontWeight="bold">
      {children}
    </Button>
  );
};
export const Navigation = () => {
  return (
    <HStack>
      <Item to="/">Home</Item>
      <Item to="/nfts">Evm NFTs</Item>
    </HStack>
  );
};
