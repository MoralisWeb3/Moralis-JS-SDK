import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const solGetNFTsResolver = async (req: Request, res: Response, next: NextFunction, apiKey: string) => {
  try {
    const response = await axios.request({
      method: "get",
      params: req.query,
      url: `https://solana-gateway.moralis.io/account/${req.params.network}/${req.params.address}/nft`,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
    return res.send(response.data);
  } catch (error) {
    return next(error);
  }
};
