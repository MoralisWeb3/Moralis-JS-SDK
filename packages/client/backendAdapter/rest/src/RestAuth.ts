import {
  Auth,
  AuthSession,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  SignInRequest,
} from '@moralisweb3/client-backend-adapter-utils';

export class RestAuth implements Auth {
  public tryGetSession(): AuthSession | null {
    throw new Error('Method not implemented.');
  }

  public getMessageToSign(_: GetMessageToSignRequest): Promise<GetMessageToSignResponse> {
    throw new Error('Method not implemented.');
  }

  public signIn(_: SignInRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
