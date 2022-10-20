import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const evmGetTokenTransfersResolver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.request({
      method: "get",
      params: req.query,
      url: "/erc20/:address/transfers",
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'apikey',
      },
    });
    return res.send(response.data);
  } catch (error) {
    return next(error);
  }
};
