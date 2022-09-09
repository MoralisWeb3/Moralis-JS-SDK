import CredentialsProvider from 'next-auth/providers/credentials';
import Moralis from 'moralis';

const MoralisNextAuthProvider = ({ MORALIS_API_KEY }: { MORALIS_API_KEY?: string } = {}) =>
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

        const apiKey = MORALIS_API_KEY || process.env.MORALIS_API_KEY;
        if (!apiKey) {
          throw new Error('MORALIS_API_KEY missing');
        }
        await Moralis.start({ apiKey });

        const { address, profileId, expirationTime, uri } = (
          await Moralis.Auth.verify({ message, signature, network: 'evm' })
        ).raw;
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
        const user = { address, profileId, expirationTime, signature };
        return user;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
      }
    },
  });

export default MoralisNextAuthProvider;
