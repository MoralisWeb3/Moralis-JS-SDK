import axios from 'axios';
import { NextFunction, Response, Request } from 'express';

export const streamsSetSettingsResolver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.request({
      method: "post",
      params: req.query,
      url: "/settings",
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
