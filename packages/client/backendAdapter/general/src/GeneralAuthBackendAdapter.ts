import {
  AuthBackendAdapter,
  IssueAuthTokenRequest,
  IssueAuthTokenResponse,
  RequestAuthMessageRequest,
  RequestAuthMessageResponse,
} from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';

export class GeneralAuthBackendAdapter implements AuthBackendAdapter {
  public constructor(protected readonly baseUrl: string, protected readonly core: Core) {}

  public requestAuthMessage(_: string, __: RequestAuthMessageRequest): Promise<RequestAuthMessageResponse> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public issueAuthToken(_: string, __: IssueAuthTokenRequest): Promise<IssueAuthTokenResponse> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }
}
