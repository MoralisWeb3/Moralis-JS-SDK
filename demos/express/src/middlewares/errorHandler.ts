import { MoralisError, isMoralisError } from '@moralisweb3/core';
import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';

export function errorHandler(error: Error | MoralisError, req: Request, res: Response, next: NextFunction) {
  if (isMoralisError(error)) {
    const errorResponse = error.details?.response;
    const errorResponseData =
      typeof errorResponse == 'object' ? (error.details?.response as Record<string, any>).data : null;

    const status = typeof error.details?.status === 'number' ? error.details?.status : 500;
    let errorMessage = error.message || 'Unknown error';

    if (errorResponseData) {
      if (errorResponseData && errorResponseData?.message) {
        errorMessage = `${errorResponseData?.name ? `${errorResponseData.name}: ` : ''}${errorResponseData.message}`;
      } else {
        errorMessage = 'Unknown error';
      }
    }

    res.status(status).json({ error: errorMessage });
  } else if (isAxiosError(error)) {
    res.status(error.response?.status || 500).json({
      data: error.response?.data || 'Unknown error',
      method: error.config.method?.toUpperCase(),
      url: error.config.url,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
}

function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
  return 'isAxiosError' in error && error.isAxiosError;
}
