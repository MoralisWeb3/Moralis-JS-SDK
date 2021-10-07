import CoreManager from './CoreManager';
import { run } from './Cloud';

/**
 * Creates the data for the authentication message by extending the message
 * with a unique string with applicationId and current time
 */
export default async function createSigningData(message) {
  let data;

  try {
    const { dateTime } = await run('getServerTime');
    const applicationId = CoreManager.get('APPLICATION_ID');

    data = `${message}\n\nId: ${applicationId}:${dateTime}`;
  } catch (error) {
    data = `${message}`;
  }

  return data;
}
