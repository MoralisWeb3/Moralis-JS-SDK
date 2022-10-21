import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const streamsUpdateStreamResolver = async (req: Request, res: Response, next: NextFunction, apiKey: string) => {
  try {
    const response = await axios.request({
      method: "post",
      params: req.query,
      url: `https://api.moralis-streams.com/streams/evm/undefined`,
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
