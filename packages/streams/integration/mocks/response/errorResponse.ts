export const createErrorResponse = (message: string, details?: Record<string, unknown>) => ({
  message,
  details,
});
