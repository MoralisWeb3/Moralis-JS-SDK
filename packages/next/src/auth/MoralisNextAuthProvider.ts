import { LoggerController, Network } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { verifyChallengeEvmOperation, verifyChallengeSolanaOperation } from '@moralisweb3/common-auth-utils';
import CredentialsProvider from 'next-auth/providers/credentials';
import Moralis from 'moralis';

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
    },
    async authorize(credentials) {
      try {
        /**
         * Receiving credentials from signIn() payload
         */
        const { message, signature, network } = credentials as {
          message: string;
          signature: string;
          network: Network;
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
          default:
            throw new Error(`The ${network} networkType is not supported for authentication`);
        }

        if (user.uri !== nextAuthUrl) {
          return null;
        }
        /**
         * Defining and returning user profile
         */
        return user;
      } catch (e) {
        const logger = new LoggerController('Next', Moralis.Core.config);
        logger.error(e);
        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
