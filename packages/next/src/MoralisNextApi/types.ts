import type { NextApiRequest, NextApiResponse } from 'next';

export type TMoralisNextHandlerParams = {
  /**
   * Used for Moralis.SDK
   * * **Default value**: .env.local.MORALIS_API_KEY
   * * **Required**: No
   *
   * [Get Your key](https://admin.moralis.io/)
   */
  MORALIS_API_KEY?: string;
};

export interface IMoralisNextHandler {
  req: NextApiRequest;
  res: NextApiResponse;
  params?: TMoralisNextHandlerParams;
}
