import type { NextApiRequest, NextApiResponse } from 'next';

export interface MoralisNextHandlerParams {
  req: NextApiRequest;
  res: NextApiResponse;
}
