import { errorHandler } from '../middlewares/errorHandler';
import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const syncNFTContractResolver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.request({
      method: "put",
      params: req.query,
      url: "/nft/{address}/sync",
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'apikey',
      },
    });
    return res.send(response.data);
  } catch (error) {
    return errorHandler(error as Error, req, res, next);
  }
};
