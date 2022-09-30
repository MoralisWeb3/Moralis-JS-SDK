import type { NextApiRequest, NextApiResponse } from 'next';

export interface IMoralisNextHandler {
  req: NextApiRequest;
  res: NextApiResponse;
}
