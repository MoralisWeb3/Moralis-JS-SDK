import { Button } from '@chakra-ui/react';
import React from 'react';
import { useMoralis } from 'react-moralis';

interface AuthenticateButtonProps {
  onClick: () => void;
}

export const AuthenticateButton = ({ onClick }: AuthenticateButtonProps) => {
  const { user, isAuthenticated } = useMoralis();

  return (
    <Button colorScheme={isAuthenticated ? 'green' : 'red'} onClick={onClick}>
      {user ? user.getUsername() : 'Authenticate'}
    </Button>
  );
};
