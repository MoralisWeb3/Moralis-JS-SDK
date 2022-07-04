import { MoralisServerError, ServerErrorCode } from '@moralisweb3/core';
import type Parse from 'parse';

export interface SignInOptions {
  username: string;
  password: string;
}

export interface HandleSignInOptions extends SignInOptions {
  server: typeof Parse;
}
export const handleSignIn = async ({ server, username, password }: HandleSignInOptions) => {
  try {
    const user = await server.User.logIn(username, password);

    return { user };
  } catch (error) {
    throw new MoralisServerError({
      code: ServerErrorCode.SIGNUP_FAILED,
      message: `Signup failed: ${error.message}`,
      cause: error,
    });
  }
};
