import { Functions, httpsCallable } from '@firebase/functions';
import {
  AuthBackendAdapter,
  IssueAuthTokenRequest,
  IssueAuthTokenResponse,
  RequestAuthMessageRequest,
  RequestAuthMessageResponse,
} from '@moralisweb3/client-backend-adapter-utils';

export interface FirebaseAuthBackendAdapterOptions {
  functionNamePrefix?: string;
}

export class FirebaseAuthBackendAdapter implements AuthBackendAdapter {
  private readonly functionNamePrefix: string;

  public constructor(private readonly functions: Functions, options: FirebaseAuthBackendAdapterOptions | undefined) {
    this.functionNamePrefix = options?.functionNamePrefix ?? 'ext-moralis-auth-';
  }

  public async requestAuthMessage(
    backendModuleName: string,
    request: RequestAuthMessageRequest,
  ): Promise<RequestAuthMessageResponse> {
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

  public async issueAuthToken(
    backendModuleName: string,
    request: IssueAuthTokenRequest,
  ): Promise<IssueAuthTokenResponse> {
    const functionName = this.functionNamePrefix.concat('issueToken');
    const response = await httpsCallable<unknown, IssueTokenRawResponse>(
      this.functions,
      functionName,
    )({
      networkType: backendModuleName,
      message: request.message,
      signature: request.signature,
    });
    return {
      token: response.data.token,
    };
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
