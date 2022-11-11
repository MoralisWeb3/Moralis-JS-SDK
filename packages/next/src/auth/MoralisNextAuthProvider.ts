import CredentialsProvider from 'next-auth/providers/credentials';
import Moralis from 'moralis';
import { LoggerController, Config } from '@moralisweb3/common-core';
import { MoralisNextAuthProviderParams } from './types';

const MoralisNextAuthProvider = ({ logLevel = 'info' }: MoralisNextAuthProviderParams = {}) =>
  /**
   * Configuring default CredentialsProvider from 'next-auth'
   * with required steps and data for verifying signed message
   */
  CredentialsProvider({
    name: 'MoralisAuth',
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
    },
    async authorize(credentials) {
      try {
        /**
         * Receiving credentials from signIn() payload
         */
        const { message, signature } = credentials as Record<string, string>;

        const apiKey = process.env.MORALIS_API_KEY;
        if (!apiKey) {
          throw new Error('MORALIS_API_KEY missing');
        }
        await Moralis.start({ apiKey });

        const { address, profileId, uri } = (await Moralis.Auth.verify({ message, signature, network: 'evm' })).raw;
        const nextAuthUrl = process.env.NEXTAUTH_URL;

        if (!nextAuthUrl) {
          throw new Error('NEXTAUTH_URL missing');
        }

        if (uri !== nextAuthUrl) {
          return null;
        }
        /**
         * Defining and returning user profile
         */
        const user = { address, id: profileId, signature };
        return user;
      } catch (e) {
        const config = new Config();
        config.set('logLevel', logLevel);
        const logger = new LoggerController('[MoralisNextAuthProvider]', config);
        logger.error(e);
        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
