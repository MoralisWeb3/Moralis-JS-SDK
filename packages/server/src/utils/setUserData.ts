import { MoralisServerError, ServerErrorCode } from '@moralisweb3/core/lib';
import type Parse from 'parse';

export type UserDataValue = string | number | boolean | Parse.File | undefined | null;

export type SetUserData = Record<string, UserDataValue>;

export const setUserData = (data: SetUserData, user: Parse.User) => {
  // We use the specified functions to set password, email, and username
  const { password, email, username, ...restData } = data;

  if (password !== undefined) {
    if (typeof password !== 'string') {
      throw new MoralisServerError({
        code: ServerErrorCode.VALIDATION_ERROR,
        message: 'password can only be a string type',
      });
    }
    user.setPassword(password);
  }

  if (email !== undefined) {
    if (typeof email !== 'string') {
      throw new MoralisServerError({
        code: ServerErrorCode.VALIDATION_ERROR,
        message: 'email can only be a string type',
      });
    }
    user.setEmail(email);
  }

  if (username !== undefined) {
    if (typeof username !== 'string') {
      throw new MoralisServerError({
        code: ServerErrorCode.VALIDATION_ERROR,
        message: 'username can only be a string type',
      });
    }
    user.setUsername(username);
  }

  Object.entries(restData)
    .filter(([, value]) => value !== undefined)
    .forEach(([key, value]) => {
      user.set(key, value);
    });
};
