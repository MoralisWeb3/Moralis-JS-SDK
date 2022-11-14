import * as functions from 'firebase-functions';

// ~/getSecretData

export const getSecretData = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError('permission-denied', 'You are not authorized to call this function');
  }

  const secretValue = 'I am a secret';
  return { secretValue };
});
