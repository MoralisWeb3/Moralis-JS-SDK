import Moralis from 'moralis';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const MONTH = 60 * 60 * 24 * 30;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message, signature, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const verifiedMessage = (await Moralis.Auth.verify({ message, signature, network })).raw;

    const secret = process.env.SECRET;

    if (!secret) {
      return res.status(400).json({ message: 'No secret set' });
    }
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + MONTH, // 30 days
        ...verifiedMessage,
      },
      secret,
    );

    const serialized = serialize('MoralisAuthJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: MONTH,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);

    res.status(200).json(verifiedMessage);
  } catch (error) {
    res.status(400).json({ error });
  }
}
