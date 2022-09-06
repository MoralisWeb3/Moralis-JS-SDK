import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';

const future = new Date();
future.setDate(future.getDate() + 30);

const DOMAIN = process.env.APP_DOMAIN;
const STATEMENT = 'Please sign this message to confirm your identity.';
const URI = process.env.NEXTAUTH_URL;
const EXPIRATION_TIME = future.toISOString();
const TIMEOUT = 15;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    if (!DOMAIN || !URI) {
      throw new Error('Please add APP_DOMAIN in the .env.local');
    }
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      domain: DOMAIN,
      statement: STATEMENT,
      uri: URI,
      expirationTime: EXPIRATION_TIME,
      timeout: TIMEOUT,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error });
  }
}
