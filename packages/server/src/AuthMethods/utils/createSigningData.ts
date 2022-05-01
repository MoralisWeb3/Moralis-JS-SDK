import type Parse from 'parse';
import core from '@moralis/core';

/**
 * Creates the data for the authentication message by extending the message
 * with a unique string with applicationId and current time
 */
export const createSigningData = async ({ message, server }: { message: string; server: typeof Parse }) => {
  const { dateTime } = await server.Cloud.run('getServerTime');

  const appId = core.config.get('appId');

  const data = `${message}\n\nId: ${appId}:${dateTime}`;

  return data;
};
