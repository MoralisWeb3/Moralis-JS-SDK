import jwt from 'jsonwebtoken';
import { CookieOptions, Response } from 'express';

export const generateAccessToken = (
  payload: { address: string; signature: string },
  secret: string,
  expiresIn: string | number | undefined = '365d',
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const resCookieJWT = (token: string, res: Response, data: unknown, cookieConfig?: CookieOptions) => {
  if (!cookieConfig) {
    cookieConfig = {
      httpOnly: true,
    };
  }
  res.cookie('moralis_jwt', token, cookieConfig).cookie('moralis_session', JSON.stringify(data)).status(200).json(data);
};
