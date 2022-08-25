import { isMoralisError, MoralisError } from '@moralisweb3/core';
import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';

const makeMoralisErrorMessage = (error: MoralisError) => {
  let message = error.message || 'Unknown error';

  const errorResponse = error.details?.response;

  const errorResponseData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof errorResponse === 'object' ? (error.details?.response as Record<string, any>).data : null;

  if (errorResponseData) {
    // Handle MoralisError
    if (errorResponseData && errorResponseData?.message) {
      message = `${errorResponseData?.name ? `${errorResponseData.name}: ` : ''}${errorResponseData.message}`;
    } else if (errorResponseData.error) {
      // Handle ParseError
      message = errorResponseData.error;
    }
  }

  return message;
};

export function errorHandler(
  error: Error | MoralisError | AxiosError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // eslint-disable-next-line no-console
  console.error('ErrorHandler', error);

  if (isMoralisError(error)) {
    const status = typeof error.details?.status === 'number' ? error.details?.status : 500;
    const errorMessage = makeMoralisErrorMessage(error);

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

function isAxiosError<Type>(error: Error | AxiosError<Type>): error is AxiosError<Type> {
  return 'isAxiosError' in error && error.isAxiosError;
}
