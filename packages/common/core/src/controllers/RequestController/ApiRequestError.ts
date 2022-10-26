import { AxiosError } from 'axios';

type ApiRequestError = AxiosError<{ message?: string | string[] }> & {
  response: NonNullable<AxiosError<{ message: string | string[]; details?: Record<string, unknown> }>['response']>;
};

/**
 * Verify if the error is an AxiosError that is caused by a HTTP API error.
 */
export const isApiRequestError = (error: unknown): error is ApiRequestError => {
  // Check if the error is an axios error
  if (!(error instanceof AxiosError)) {
    return false;
  }

  // Check if the error is a result of a 400 or 500 response
  if (error.code !== AxiosError.ERR_BAD_REQUEST && error.code !== AxiosError.ERR_BAD_RESPONSE) {
    return false;
  }

  return true;
};

/**
 * Extract the message from a ApiRequestError. Note that this is implemented based on how the Moralis APIs return Errors.
 * This can be in the form:
 * - { message: 'some message' }
 * - { message: ['some message', 'some other message'] }
 * - { }
 */
export const getMessageFromApiRequestError = (error: ApiRequestError) => {
  const { message, details } = error.response.data;

  let result = 'Unknown error (no error info returned from API)';

  if (Array.isArray(message)) {
    result = message.join(', ');
  } else if (typeof message === 'string') {
    result = message;
  }

  if (details) {
    result += ` ${JSON.stringify(details)}`;
  }

  return result;
};
