import Moralis from 'moralis';
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

const CurrentTime = new Date();
CurrentTime.setMinutes(CurrentTime.getMinutes() + 15);

const DOMAIN = 'amazing.finance';
const STATEMENT = 'Please sign this message to confirm your identity.';
const URI = 'https://amazing.finance';
const EXPIRATION_TIME = CurrentTime.toISOString();
const TIMEOUT = 15;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
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
