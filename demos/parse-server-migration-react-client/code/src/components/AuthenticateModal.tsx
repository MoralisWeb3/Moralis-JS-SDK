import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis-v1';

interface AuthenticateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthenticateModal = ({ isOpen, onClose }: AuthenticateModalProps) => {
  const { authenticate, enableWeb3 } = useMoralis();

  const [authError, setAuthError] = useState<null | Error>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  /**
   * 1) Connect to a Evm
   * 2) Request message to sign using the Moralis Auth Api of moralis (handled on server)
   * 3) Login via parse using the signed message (verification handled on server via Moralis Auth Api)
   */
  const handleAuth = async (provider: 'metamask' | 'walletconnect' | 'magicLink' | 'web3Auth' = 'metamask') => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        networkType: 'evm',
      });

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
      onClose();
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Web3 Authentication</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error: {authError.name}</AlertTitle>
              <AlertDescription>{authError.message}</AlertDescription>
            </Alert>
          )}
          <VStack alignItems="stretch">
            <Button onClick={() => handleAuth('metamask')} disabled={isAuthenticating}>
              Metamask
            </Button>
            <Button onClick={() => handleAuth('walletconnect')} disabled={isAuthenticating}>
              WalletConnect
            </Button>
            <Button onClick={() => handleAuth('magicLink')} disabled={isAuthenticating}>
              MagicLink
            </Button>
            <Button onClick={() => handleAuth('web3Auth')} disabled={isAuthenticating}>
              Web3Auth
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
