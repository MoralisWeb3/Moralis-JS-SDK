import NextAuth, { ISODateString } from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';

export type TUserData = {
  address: string;
  signature: string;
  profileId: string;
  expirationTime: ISODateString;
};

export interface ISession {
  user: TUserData;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.expires = (token as unknown as ISession).user.expirationTime;
      (session as unknown as ISession).user = (token as unknown as ISession).user;
      return session;
    },
  },
});
