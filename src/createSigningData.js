import CoreManager from './CoreManager';

/**
 * Creates the data for the authentication message by extending the message
 * with a unique string with applicationId and current time
 */
export default function createSigningData(message) {
  const time = new Date().getTime();
  const applicationId = CoreManager.get('APPLICATION_ID');

  const data = `${message}\n\nId: ${applicationId}:${time}`;

  return data;
}
