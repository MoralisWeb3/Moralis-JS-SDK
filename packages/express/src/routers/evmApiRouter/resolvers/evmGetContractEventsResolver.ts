import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const evmGetContractEventsResolver = async (req: Request, res: Response, next: NextFunction, apiKey: string) => {
  try {
    const response = await axios.request({
      method: "post",
      params: req.query,
      url: `https://deep-index.moralis.io/api/v2/${req.params.address}/events`,
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
