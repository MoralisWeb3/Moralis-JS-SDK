import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import { AuthenticateButton } from './AuthenticateButton';
import { AuthenticateModal } from './AuthenticateModal';
import UserModal from './UserModal';

export const Authenticate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user } = useMoralis();

  return (
    <>
      <AuthenticateButton onClick={onOpen} />
      <AuthenticateModal isOpen={!isAuthenticated && isOpen} onClose={onClose} />
      {user && <UserModal isOpen={isAuthenticated && isOpen} onClose={onClose} user={user} />}
    </>
  );
};
