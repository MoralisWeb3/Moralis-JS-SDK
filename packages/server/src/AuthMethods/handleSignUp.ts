import { MoralisServerError, ServerErrorCode } from '@moralisweb3/core/lib';
import type Parse from 'parse';
import { setUserData, UserDataValue } from '../utils/setUserData';

export interface SignUpOptions {
  username: string;
  password: string;
  email?: string;
  fields?: Record<string, UserDataValue>;
}

export interface HandleSignUpOptions extends SignUpOptions {
  server: typeof Parse;
}
export const handleSignUp = async ({ server, username, password, email, fields }: HandleSignUpOptions) => {
  try {
    const newUser = new server.User();

    setUserData(
      {
        username,
        password,
        email,
        ...fields,
      },
      newUser,
    );

    const user = await newUser.signUp();

    return { user };
  } catch (error) {
    throw new MoralisServerError({
      code: ServerErrorCode.SIGNUP_FAILED,
      message: `Signup failed: ${error.message}`,
      cause: error,
    });
  }
};
