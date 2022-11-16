export const createSimpleAuthResponse = (id: string, message: string | string[], profileId: string | string[]) => ({
  id,
  message,
  profileId,
});
