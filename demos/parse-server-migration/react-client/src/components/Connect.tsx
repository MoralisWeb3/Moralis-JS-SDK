import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { ConnectButton } from './ConnectButton';
import { ConnectModal } from './ConnectModal';

export const Connect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ConnectButton onClick={onOpen} />
      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
