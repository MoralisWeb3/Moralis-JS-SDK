// import { LoggerController, Config } from '@moralisweb3/common-core';
import { MoralisNextAuthProviderParams } from './types';
import { VerifyChallengeSolanaJSONResponse, VerifyChallengeEvmJSONResponse } from '@moralisweb3/auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

const MoralisNextAuthProvider = ({ network = 'Evm' }: MoralisNextAuthProviderParams = {}) =>
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

        let operationName;
        switch (network) {
          case 'Evm':
            operationName = 'verifyChallengeEvm';
            break;
          case 'Solana':
            operationName = 'verifyChallengeSolana';
            break;
        }

        const { data } = await axios.post<VerifyChallengeSolanaJSONResponse | VerifyChallengeEvmJSONResponse>(
          `http://localhost:3000/api/moralis/auth/${operationName}`,
          { message, signature },
        );

        console.log('data: ', data);

        const nextAuthUrl = process.env.NEXTAUTH_URL;

        if (!nextAuthUrl) {
          throw new Error('NEXTAUTH_URL missing');
        }

        if (data.uri !== nextAuthUrl) {
          return null;
        }
        /**
         * Defining and returning user profile
         */
        const user = { address: data.address, id: data.profileId, signature };
        return user;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
