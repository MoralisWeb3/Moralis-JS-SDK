import {
  AuthBackendAdapter,
  IssueAuthTokenRequest,
  IssueAuthTokenResponse,
  RequestAuthMessageRequest,
  RequestAuthMessageResponse,
} from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';

export interface GeneralAuthBackendAdapterOptions {
  // TODO: replace this property
  todo: number;
}

export class GeneralAuthBackendAdapter implements AuthBackendAdapter {
  public constructor(
    protected readonly core: Core,
    protected readonly options: GeneralAuthBackendAdapterOptions | undefined,
  ) {}

  public requestAuthMessage(_: string, __: RequestAuthMessageRequest): Promise<RequestAuthMessageResponse> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public issueAuthToken(_: string, __: IssueAuthTokenRequest): Promise<IssueAuthTokenResponse> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }
}
