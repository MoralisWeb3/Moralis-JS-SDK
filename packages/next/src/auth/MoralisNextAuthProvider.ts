import { VerifyChallengeSolanaJSONResponse, VerifyChallengeEvmJSONResponse } from '@moralisweb3/auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Network } from 'moralis/common-core';

const MoralisNextAuthProvider = ({ network = 'Evm' }: { network?: Network } = {}) =>
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

        const nextAuthUrl = process.env.NEXTAUTH_URL;

        if (!nextAuthUrl) {
          throw new Error('NEXTAUTH_URL missing');
        }

        const { data: user } = await axios.post<VerifyChallengeSolanaJSONResponse | VerifyChallengeEvmJSONResponse>(
          `${nextAuthUrl}/api/moralis/auth/verifyChallenge${network}`,
          { message, signature },
        );

        if (user.uri !== nextAuthUrl) {
          return null;
        }
        /**
         * Defining and returning user profile
         */
        return user;
      } catch (e) {
        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
