import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

type MoralisSession = { address: string; signature: string };

export const moralisJWT = (tokenSecret: string) => {
  if (!tokenSecret) {
    throw new Error('No Token Secret Provided');
  }

  const middleware = (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.cookies['moralis_jwt'];
    if (!jwtToken) {
      return res.status(403).json({ message: 'No JWT Token in the cookies' });
    }
    try {
      const data = jwt.verify(jwtToken, tokenSecret) as MoralisSession;
      (req as unknown as { user: MoralisSession }).user = {
        signature: data.signature,
        address: data.address,
      };
      return next();
    } catch {
      return res.status(403).json({ message: 'Invalid JWT' });
    }
  };
  return middleware;
};
