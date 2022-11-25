export interface AuthBackendAdapter {
  requestAuthMessage(
    backendModuleName: string,
    request: RequestAuthMessageRequest,
  ): Promise<RequestAuthMessageResponse>;

  issueAuthToken(backendModuleName: string, request: IssueAuthTokenRequest): Promise<IssueAuthTokenResponse>;
}

export interface RequestAuthMessageRequest {
  address: string;
  chain?: string;
  network?: string;
}

export interface RequestAuthMessageResponse {
  message: string;
  profileId: string;
}

export interface IssueAuthTokenRequest {
  message: string;
  signature: string;
}

export interface IssueAuthTokenResponse {
  token: string;
}
