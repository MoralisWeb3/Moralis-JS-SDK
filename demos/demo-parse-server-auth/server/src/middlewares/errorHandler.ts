export function errorHandler(error, req, res, next) {
  console.error('ErrorHandler', error);

  const errorResponseData = error.details?.response?.data;

  let status = error.details?.status || 500;
  let errorMessage = error.message || 'Unknown error';

  if (errorResponseData) {
    // Handle MoralisError
    if (errorResponseData && errorResponseData.message) {
      errorMessage = `${errorResponseData?.name ? `${errorResponseData.name}: ` : ''}${errorResponseData.message}`;
    } else if (errorResponseData.error) {
      // Handle ParseError
      errorMessage = errorResponseData.error;
    }
  }

  res.status(status).json({ error: errorMessage });
}
