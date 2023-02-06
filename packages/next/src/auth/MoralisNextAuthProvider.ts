import { Network } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { verifyChallengeAptosOperation, verifyChallengeEvmOperation, verifyChallengeSolanaOperation } from '@moralisweb3/common-auth-utils';
import CredentialsProvider from 'next-auth/providers/credentials';
import Moralis from 'moralis';
import { serverLogger } from '../serverLogger';

const MoralisNextAuthProvider = () =>
  /**
   * Configuring default CredentialsProvider from 'next-auth'
   * with required steps and data for verifying signed message
   */
  CredentialsProvider({
    name: 'MoralisAuth',
    id: 'moralis-auth',
    /**
     * Credentials is required data for authentication
     * Received from Moralis.Auth.requestMessage()
     * Provided via signin()
     */
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
      network: {
        label: 'Network',
        type: 'text',
        placeholder: 'Evm',
      },
      /**
       * Some extra information keeping in a session.
       */
      payload: {
        label: 'Payload',
        type: 'text',
        placeholder: 'Payload',
      },
    },
    async authorize(credentials) {
      try {
        /**
         * Receiving credentials from signIn() data
         */
        const {
          message,
          signature,
          network = 'Evm',
          payload = null,
        } = credentials as {
          message: string;
          signature: string;
          network: Network;
          payload: string | null;
        };

        const nextAuthUrl = process.env.NEXTAUTH_URL;

        if (!nextAuthUrl) {
          throw new Error('NEXTAUTH_URL missing');
        }

        const { baseUrl } = Moralis.Auth;

        let user;
        switch (network) {
          case 'Evm':
            user = (
              await new OperationResolver(verifyChallengeEvmOperation, baseUrl, Moralis.Core).fetch({
                message,
                signature,
              })
            ).raw;
            break;
          case 'Solana':
            user = (
              await new OperationResolver(verifyChallengeSolanaOperation, baseUrl, Moralis.Core).fetch({
                message,
                signature,
              })
            ).raw;
            break;
          case 'Aptos':
            user = (
              await new OperationResolver(verifyChallengeAptosOperation, baseUrl, Moralis.Core).fetch({
                message,
                signature,
              })
            ).raw;
            break;
          default:
            throw new Error(`The ${network} networkType is not supported for authentication`);
        }

        if (user.uri !== nextAuthUrl) {
          return null;
        }
        /**
         * Defining and returning user profile
         */
        return { ...user, payload };
      } catch (error) {
        serverLogger.error(`Unknown error in MoralisNextAuthProvider authorize ${error.message}`, { error });

        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
