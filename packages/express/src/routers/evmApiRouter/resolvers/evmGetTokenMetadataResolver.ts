import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const evmGetTokenMetadataResolver = async (req: Request, res: Response, next: NextFunction, apiKey: string) => {
  try {
    const response = await axios.request({
      method: "get",
      params: req.query,
      url: `https://deep-index.moralis.io/api/v2/erc20/metadata`,
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
