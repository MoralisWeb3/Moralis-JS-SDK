import { FirebaseError } from '@firebase/util';
import * as admin from 'firebase-admin';

export async function userExists(auth: ReturnType<typeof admin.auth>, uid: string): Promise<boolean> {
  try {
    await auth.getUser(uid);
    return true;
  } catch (e) {
    if ((e as FirebaseError).code === 'auth/user-not-found') {
      return false;
    }
    throw e;
  }
}
