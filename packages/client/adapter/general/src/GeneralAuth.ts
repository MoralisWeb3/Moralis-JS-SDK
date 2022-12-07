import {
  Auth,
  User,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  SignInRequest,
} from '@moralisweb3/client-adapter-utils';

export class GeneralAuth implements Auth {
  public tryGetUser(): User | null {
    throw new Error('Method not implemented.');
  }

  public getMessageToSign(_: string, __: GetMessageToSignRequest): Promise<GetMessageToSignResponse> {
    throw new Error('Method not implemented.');
  }

  public signIn(_: string, __: SignInRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
