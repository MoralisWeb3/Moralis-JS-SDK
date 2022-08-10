import { MoralisError } from '@moralisweb3/core';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(error: Error | MoralisError, req: Request, res: Response, next: NextFunction) {
  console.error('ErrorHandler', error);

  if (error instanceof MoralisError) {
    const errorResponse = error.details?.response;
    const errorResponseData =
      typeof errorResponse == 'object' ? (error.details?.response as Record<string, any>).data : null;

    let status = typeof error.details?.status === 'number' ? error.details?.status : 500;
    let errorMessage = error.message || 'Unknown error';

    if (errorResponseData) {
      // Handle MoralisError
      if (errorResponseData && errorResponseData?.message) {
        errorMessage = `${errorResponseData?.name ? `${errorResponseData.name}: ` : ''}${errorResponseData.message}`;
      } else if (errorResponseData.error) {
        // Handle ParseError
        errorMessage = errorResponseData.error;
      }
    }

    res.status(status).json({ error: errorMessage });
  } else {
    res.status(500).json({ error: error.message });
  }
}
