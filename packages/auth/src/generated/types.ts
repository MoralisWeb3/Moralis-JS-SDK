/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/challenge': {
    post: operations['initializeChallenge'];
  };
  '/challenge/complete': {
    post: operations['completeChallenge'];
  };
  '/health': {
    get: operations['HealthController_check'];
  };
}

export interface components {
  schemas: {
    ChallengeRequestDto: {
      /**
       * Format: hostname
       * @description RFC 4501 dns authority that is requesting the signing.
       * @example rugpull.finance
       */
      domain: string;
      /**
       * @description EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts must be resolved.
       * @example 1
       */
      chainId: number;
      /**
       * @description Ethereum address performing the signing conformant to capitalization encoded checksum specified in EIP-55 where applicable.
       * @example 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
       */
      address: string;
      /**
       * @description Human-readable ASCII assertion that the user will sign, and it must not contain `
       * `.
       * @example Please confirm
       */
      statement?: string;
      /**
       * Format: uri
       * @description RFC 3986 URI referring to the resource that is the subject of the signing (as in the __subject__ of a claim).
       * @example https://rugpull.finance/
       */
      uri: string;
      /**
       * Format: date-time
       * @description ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.
       * @example 2020-01-01T00:00:00.000Z
       */
      expirationTime?: string;
      /**
       * Format: date-time
       * @description ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.
       * @example 2020-01-01T00:00:00.000Z
       */
      notBefore?: string;
      /**
       * @description List of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed as RFC 3986 URIs separated by `
       * - `.
       * @example https://docs.moralis.io/
       */
      resources?: string[];
      /**
       * @description Time in seconds before the challenge is expired
       * @default 15
       * @example 15
       */
      timeout: number;
    };
    ChallengeResponseDto: {
      /**
       * @description Secret Challenge ID used to identify this particular request. Is should be used at the backend of the calling service to identify the completed request.
       * @example fRyt67D3eRss3RrX
       */
      id: string;
      /**
       * @description Message that needs to be signed by the end user
       * @example rugpull.finance wants you to sign in with your Ethereum account:
       * 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
       *
       * Please confirm
       *
       * URI: https://rugpull.finance/
       * Version: 1
       * Chain ID: 1
       * Nonce: DbU1DCTmdzR4lg3wi
       * Issued At: 2022-06-12T12:15:31.290Z
       * Expiration Time: 2020-01-01T00:00:00.000Z
       * Not Before: 2020-01-01T00:00:00.000Z
       * Resources:
       * - https://docs.moralis.io/
       */
      message: string;
      profileId: string;
    };
    CompleteChallengeRequestDto: {
      message: string;
      /** @example 0x1234567890abcdef0123456789abcdef1234567890abcdef */
      signature: string;
    };
    CompleteChallengeResponseDto: {
      /**
       * @description Secret Challenge ID used to identify this particular request. Is should be used at the backend of the calling service to identify the completed request.
       * @example fRyt67D3eRss3RrX
       */
      id: string;
      /**
       * Format: hostname
       * @description RFC 4501 dns authority that is requesting the signing.
       * @example rugpull.finance
       */
      profileId: string;
      domain: string;
      /**
       * @description EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts must be resolved.
       * @example 1
       */
      chainId: number;
      /**
       * @description Ethereum address performing the signing conformant to capitalization encoded checksum specified in EIP-55 where applicable.
       * @example 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
       */
      address: string;
      /**
       * @description Human-readable ASCII assertion that the user will sign, and it must not contain `
       * `.
       * @example Please confirm
       */
      statement?: string;
      /**
       * Format: uri
       * @description RFC 3986 URI referring to the resource that is the subject of the signing (as in the __subject__ of a claim).
       * @example https://rugpull.finance/
       */
      uri: string;
      /**
       * Format: date-time
       * @description ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.
       * @example 2020-01-01T00:00:00.000Z
       */
      expirationTime?: string;
      /**
       * Format: date-time
       * @description ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.
       * @example 2020-01-01T00:00:00.000Z
       */
      notBefore?: string;
      /**
       * @description List of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed as RFC 3986 URIs separated by `
       * - `.
       * @example https://docs.moralis.io/
       */
      resources?: string[];
      /**
       * @description EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts must be resolved.
       * @example 1.0
       */
      version: string;
      /** @example 0x1234567890abcdef0123456789abcdef1234567890abcdef */
      nonce: string;
    };
  };
}

export interface operations {
  initializeChallenge: {
    parameters: {};
    responses: {
      /** The back channel challenge containing the id to store on the api and the message to be signed by the user */
      201: {
        content: {
          'application/json': components['schemas']['ChallengeResponseDto'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ChallengeRequestDto'];
      };
    };
  };
  completeChallenge: {
    parameters: {};
    responses: {
      /** The token to be used to call the third party API from the client */
      201: {
        content: {
          'application/json': components['schemas']['CompleteChallengeResponseDto'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['CompleteChallengeRequestDto'];
      };
    };
  };
  HealthController_check: {
    parameters: {};
    responses: {
      /** The Health Check is successful */
      200: {
        content: {
          'application/json': {
            /** @example ok */
            status?: string;
            /** @example [object Object] */
            info?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            } | null;
            /** @example [object Object] */
            error?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            } | null;
            /** @example [object Object] */
            details?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            };
          };
        };
      };
      /** The Health Check is not successful */
      503: {
        content: {
          'application/json': {
            /** @example error */
            status?: string;
            /** @example [object Object] */
            info?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            } | null;
            /** @example [object Object] */
            error?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            } | null;
            /** @example [object Object] */
            details?: {
              [key: string]: {
                status?: string;
              } & { [key: string]: string };
            };
          };
        };
      };
    };
  };
}

export interface external {}
