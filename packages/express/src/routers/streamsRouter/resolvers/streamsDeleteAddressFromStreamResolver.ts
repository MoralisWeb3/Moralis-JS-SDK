import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const streamsDeleteAddressFromStreamResolver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.request({
      method: "delete",
      params: req.query,
      url: "/streams/evm/undefined/address",
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
