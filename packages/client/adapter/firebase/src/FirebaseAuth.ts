import { Functions, httpsCallable } from '@firebase/functions';
import {
  Auth as MoralisAuth,
  User,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  NetworkTypeResolver,
  SignInRequest,
} from '@moralisweb3/client-adapter-utils';
import { signInWithCustomToken, Auth } from '@firebase/auth';

export class FirebaseAuth implements MoralisAuth {
  private readonly functionNamePrefix: string;

  public constructor(
    private readonly auth: Auth,
    private readonly functions: Functions,
    functionNamePrefix: string | undefined,
  ) {
    this.functionNamePrefix = functionNamePrefix || 'ext-moralis-auth-';
  }

  public tryGetUser(): User | null {
    if (!this.auth.currentUser) {
      return null;
    }
    const address = this.auth.currentUser.displayName;
    const profileId = this.auth.currentUser.uid;
    if (!address || !profileId) {
      return null;
    }
    return {
      networkType: NetworkTypeResolver.resolveByAddress(address),
      address,
      profileId,
    };
  }

  public async getMessageToSign(
    backendModuleName: string,
    request: GetMessageToSignRequest,
  ): Promise<GetMessageToSignResponse> {
    const functionName = this.functionNamePrefix.concat('requestMessage');
    const response = await httpsCallable<unknown, RequestMessageRawResponse>(
      this.functions,
      functionName,
    )({
      networkType: backendModuleName,
      address: request.address,
      network: request.network,
      chain: request.chain,
    });

    return {
      message: response.data.message,
      profileId: response.data.profileId,
    };
  }

  public async signIn(backendModuleName: string, request: SignInRequest): Promise<void> {
    const functionName = this.functionNamePrefix.concat('issueToken');
    const response = await httpsCallable<unknown, IssueTokenRawResponse>(
      this.functions,
      functionName,
    )({
      networkType: backendModuleName,
      message: request.message,
      signature: request.signature,
    });
    const { token } = response.data;

    await signInWithCustomToken(this.auth, token);
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}

interface RequestMessageRawResponse {
  id: string;
  message: string;
  profileId: string;
}

interface IssueTokenRawResponse {
  token: string;
}
