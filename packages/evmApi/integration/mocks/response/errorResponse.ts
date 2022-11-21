export const createErrorResponse = (message: string, details?: string | string[]) => ({
  message,
  details,
});
