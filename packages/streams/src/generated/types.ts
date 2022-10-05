/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/history": {
    get: operations["GetHistory"];
  };
  "/history/replay/{id}": {
    /** Replay a specific history. */
    post: operations["ReplayHistory"];
  };
  "/settings": {
    /** Get the settings for the current project based on the project api-key. */
    get: operations["GetSettings"];
    /** Set the settings for the current project based on the project api-key. */
    post: operations["SetSettings"];
  };
  "/beta/stats": {
    /** Get the stats for the current project based on the project api-key (Beta - This endpoint could be replaced or removed). */
    get: operations["GetStats"];
  };
  "/streams/evm": {
    /** Get all the evm streams for the current project based on the project api-key. */
    get: operations["GetStreams"];
    /** Creates a new evm stream. */
    put: operations["CreateStream"];
  };
  "/streams/evm/{id}": {
    /** Get a specific evm stream. */
    get: operations["GetStream"];
    /** Updates a specific evm stream. */
    post: operations["UpdateStream"];
    /** Delete a specific evm stream. */
    delete: operations["DeleteStream"];
  };
  "/streams/evm/{id}/status": {
    /** Updates the status of specific evm stream. */
    post: operations["UpdateStreamStatus"];
  };
  "/streams/evm/{id}/address": {
    /** Get all addresses associated with a specific stream. */
    get: operations["GetAddresses"];
    /** Adds an address to a Stream. */
    post: operations["AddAddressToStream"];
    /** Deletes an address from a Stream. */
    delete: operations["DeleteAddressFromStream"];
  };
}

export interface components {
  schemas: {
    /**
     * Format: uuid
     * @description Stringified UUIDv4.
     * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
     */
    UUID: string;
    Block: {
      number: string;
      hash: string;
      timestamp: string;
    };
    Log: {
      tag: string;
      streamId: string;
      logIndex: string;
      transactionHash: string;
      address: string;
      data: string;
      topic0: string | null;
      topic1: string | null;
      topic2: string | null;
      topic3: string | null;
    };
    Transaction: {
      tag: string;
      streamId: string;
      hash: string;
      gas: string | null;
      gasPrice: string | null;
      nonce: string | null;
      input: string | null;
      transactionIndex: string;
      fromAddress: string;
      toAddress: string | null;
      value: string | null;
      type: string | null;
      v: string | null;
      r: string | null;
      s: string | null;
      receiptCumulativeGasUsed: string | null;
      receiptGasUsed: string | null;
      receiptContractAddress: string | null;
      receiptRoot: string | null;
      receiptStatus: string | null;
    };
    InternalTransaction: {
      from: string | null;
      to: string | null;
      value: string | null;
      transactionHash: string;
      gas: string | null;
      streamId: string;
      tag: string;
    };
    AbiInput: {
      name: string;
      type: string;
      indexed?: boolean;
      components?: components["schemas"]["AbiInput"][];
      internalType?: string;
    };
    AbiOutput: {
      name: string;
      type: string;
      components?: components["schemas"]["AbiOutput"][];
      internalType?: string;
    };
    /** @enum {string} */
    StateMutabilityType: "pure" | "view" | "nonpayable" | "payable";
    /** @enum {string} */
    AbiType: "function" | "constructor" | "event" | "fallback";
    /**
     * @description The abi to parse the log object of the contract
     * @example {}
     */
    AbiItem: {
      anonymous?: boolean;
      constant?: boolean;
      inputs?: components["schemas"]["AbiInput"][];
      name?: string;
      outputs?: components["schemas"]["AbiOutput"][];
      payable?: boolean;
      stateMutability?: components["schemas"]["StateMutabilityType"];
      type: components["schemas"]["AbiType"];
      /** Format: double */
      gas?: number;
    };
    IAbi: { [key: string]: components["schemas"]["AbiItem"][] };
    IERC20Transfer: {
      transactionHash: string;
      contract: string;
      logIndex: string;
      tag: string;
      from: string;
      to: string;
      value: string;
      tokenDecimals: string;
      tokenName: string;
      tokenSymbol: string;
      valueWithDecimals?: string;
    };
    IERC20Approval: {
      transactionHash: string;
      contract: string;
      logIndex: string;
      tag: string;
      owner: string;
      spender: string;
      value: string;
      tokenDecimals: string;
      tokenName: string;
      tokenSymbol: string;
      valueWithDecimals?: string;
    };
    INFTTransfer: {
      transactionHash: string;
      contract: string;
      logIndex: string;
      tag: string;
      tokenContractType: string;
      tokenName: string;
      tokenSymbol: string;
      operator: string | null;
      from: string;
      to: string;
      tokenId: string;
      amount: string;
    };
    INFTApprovalERC721: {
      transactionHash: string;
      contract: string;
      logIndex: string;
      tag: string;
      owner: string;
      approved: string;
      tokenId: string;
      tokenContractType: string;
      tokenName: string;
      tokenSymbol: string;
    };
    INFTApprovalERC1155: {
      transactionHash: string;
      contract: string;
      logIndex: string;
      tag: string;
      account: string;
      operator: string;
      approved: boolean;
      tokenContractType: string;
      tokenName: string;
      tokenSymbol: string;
    };
    INFTApproval: {
      ERC721: components["schemas"]["INFTApprovalERC721"][];
      ERC1155: components["schemas"]["INFTApprovalERC1155"][];
    };
    "webhookTypes.IWebhook": {
      erc20Transfers: components["schemas"]["IERC20Transfer"][];
      erc20Approvals: components["schemas"]["IERC20Approval"][];
      nftTransfers: components["schemas"]["INFTTransfer"][];
      nftApprovals: components["schemas"]["INFTApproval"];
      block: components["schemas"]["Block"];
      chainId: string;
      logs: components["schemas"]["Log"][];
      txs: components["schemas"]["Transaction"][];
      txsInternal: components["schemas"]["InternalTransaction"][];
      abis: components["schemas"]["IAbi"];
      /** Format: double */
      retries: number;
      confirmed: boolean;
    };
    HistoryModel: {
      id: components["schemas"]["UUID"];
      date: string;
      payload: components["schemas"]["webhookTypes.IWebhook"];
      errorMessage: string;
      webhookUrl: string;
    };
    "historyTypes.HistoryResponse": {
      result: components["schemas"]["HistoryModel"][];
      cursor?: string;
      /** Format: double */
      total: number;
    };
    "historyTypes.HistoryModel": {
      id: components["schemas"]["UUID"];
      date: string;
      payload: components["schemas"]["webhookTypes.IWebhook"];
      errorMessage: string;
      webhookUrl: string;
    };
    /**
     * Format: uuid
     * @description Stringified UUIDv4.
     * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
     */
    "historyTypes.UUID": string;
    /** @enum {string} */
    SettingsRegion:
      | "us-east-1"
      | "us-west-2"
      | "eu-central-1"
      | "ap-southeast-1";
    "settingsTypes.SettingsModel": {
      /** @description The region from where all the webhooks will be posted for this project */
      region?: components["schemas"]["SettingsRegion"];
    };
    "statsTypes.StatsModel": {
      /**
       * Format: double
       * @description The total amount of webhooks delivered across all streams
       */
      totalWebhooksDelivered: number;
      /**
       * Format: double
       * @description The total amount of failed webhooks across all streams
       */
      totalWebhooksFailed: number;
      /**
       * Format: double
       * @description The total amount of logs processed across all streams, this includes failed webhooks
       */
      totalLogsProcessed: number;
      /**
       * Format: double
       * @description The total amount of txs processed across all streams, this includes failed webhooks
       */
      totalTxsProcessed: number;
      /**
       * Format: double
       * @description The total amount of internal txs processed across all streams, this includes failed webhooks
       */
      totalTxsInternalProcessed: number;
    };
    /**
     * @description The stream status:
     * [active] The Stream is healthy and processing blocks
     * [paused] The Stream is paused and is not processing blocks
     * [error] The Stream has encountered an error and is not processing blocks
     * @enum {string}
     */
    StreamsStatus: "active" | "paused" | "error";
    /**
     * @description The filter object, optional and only used if the type : log
     * https://v1docs.moralis.io/moralis-dapp/automatic-transaction-sync/smart-contract-events#event-filters
     * @example {}
     */
    StreamsFilter: { [key: string]: unknown };
    /** @description Advanced Options for each specific topic */
    advancedOptions: {
      topic0: string;
      filter?: components["schemas"]["StreamsFilter"];
      includeNativeTxs?: boolean;
    };
    StreamsModel: {
      /** @description Webhook URL where moralis will send the POST request. */
      webhookUrl: string;
      /** @description A description for this stream */
      description: string;
      /** @description A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present */
      tag: string;
      /** @description An Array of topic0's in hex, required if the type : log */
      topic0?: string[] | null;
      /** @description Include events for all addresses (only applied when abi and topic0 is provided) */
      allAddresses?: boolean;
      /** @description Include or not native transactions defaults to false (only applied when type:contract) */
      includeNativeTxs?: boolean;
      /** @description Include or not logs of contract interactions defaults to false */
      includeContractLogs?: boolean;
      /** @description Include or not include internal transactions defaults to false */
      includeInternalTxs?: boolean;
      abi?: components["schemas"]["AbiItem"][] | null;
      advancedOptions?: components["schemas"]["advancedOptions"][] | null;
      /** @description The ids of the chains for this stream in hex Ex: ["0x1","0x38"] */
      chainIds: string[];
      /** @description The unique uuid of the stream */
      id: components["schemas"]["UUID"];
      /** @description The status of the stream. */
      status: components["schemas"]["StreamsStatus"];
      /** @description Description of current status of stream. */
      statusMessage: string;
    };
    "streamsTypes.StreamsResponse": {
      /** @description Array of project Streams */
      result: components["schemas"]["StreamsModel"][];
      /** @description Cursor for fetching next page */
      cursor?: string;
      /**
       * Format: double
       * @description Total count of streams on the project
       */
      total: number;
    };
    "streamsTypes.StreamsModel": {
      /** @description Webhook URL where moralis will send the POST request. */
      webhookUrl: string;
      /** @description A description for this stream */
      description: string;
      /** @description A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present */
      tag: string;
      /** @description An Array of topic0's in hex, required if the type : log */
      topic0?: string[] | null;
      /** @description Include events for all addresses (only applied when abi and topic0 is provided) */
      allAddresses?: boolean;
      /** @description Include or not native transactions defaults to false (only applied when type:contract) */
      includeNativeTxs?: boolean;
      /** @description Include or not logs of contract interactions defaults to false */
      includeContractLogs?: boolean;
      /** @description Include or not include internal transactions defaults to false */
      includeInternalTxs?: boolean;
      abi?: components["schemas"]["AbiItem"][] | null;
      advancedOptions?: components["schemas"]["advancedOptions"][] | null;
      /** @description The ids of the chains for this stream in hex Ex: ["0x1","0x38"] */
      chainIds: string[];
      /** @description The unique uuid of the stream */
      id: components["schemas"]["UUID"];
      /** @description The status of the stream. */
      status: components["schemas"]["StreamsStatus"];
      /** @description Description of current status of stream. */
      statusMessage: string;
    };
    "streamsTypes.StreamsModelCreate": {
      /** @description Webhook URL where moralis will send the POST request. */
      webhookUrl: string;
      /** @description A description for this stream */
      description: string;
      /** @description A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present */
      tag: string;
      /** @description An Array of topic0's in hex, required if the type : log */
      topic0?: string[] | null;
      /** @description Include events for all addresses (only applied when abi and topic0 is provided) */
      allAddresses?: boolean;
      /** @description Include or not native transactions defaults to false (only applied when type:contract) */
      includeNativeTxs?: boolean;
      /** @description Include or not logs of contract interactions defaults to false */
      includeContractLogs?: boolean;
      /** @description Include or not include internal transactions defaults to false */
      includeInternalTxs?: boolean;
      abi?: components["schemas"]["AbiItem"][] | null;
      advancedOptions?: components["schemas"]["advancedOptions"][] | null;
      /** @description The ids of the chains for this stream in hex Ex: ["0x1","0x38"] */
      chainIds: string[];
    };
    /**
     * Format: uuid
     * @description Stringified UUIDv4.
     * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
     */
    "streamsTypes.UUID": string;
    /** @description Make all properties in T optional */
    "Partial_streamsTypes.StreamsModelCreate_": {
      /** @description Webhook URL where moralis will send the POST request. */
      webhookUrl?: string;
      /** @description A description for this stream */
      description?: string;
      /** @description A user-provided tag that will be send along the webhook, the user can use this tag to identify the specific stream if multiple streams are present */
      tag?: string;
      /** @description An Array of topic0's in hex, required if the type : log */
      topic0?: string[] | null;
      /** @description Include events for all addresses (only applied when abi and topic0 is provided) */
      allAddresses?: boolean;
      /** @description Include or not native transactions defaults to false (only applied when type:contract) */
      includeNativeTxs?: boolean;
      /** @description Include or not logs of contract interactions defaults to false */
      includeContractLogs?: boolean;
      /** @description Include or not include internal transactions defaults to false */
      includeInternalTxs?: boolean;
      abi?: components["schemas"]["AbiItem"][] | null;
      advancedOptions?: components["schemas"]["advancedOptions"][] | null;
      /** @description The ids of the chains for this stream in hex Ex: ["0x1","0x38"] */
      chainIds?: string[];
    };
    "streamsTypes.StreamsStatusUpdate": {
      /** @description The status of the stream. */
      status: components["schemas"]["StreamsStatus"];
    };
    Addresses: {
      /** @description Address */
      address: string;
      /** @description Unique id of object */
      id: components["schemas"]["UUID"];
    };
    "addressesTypes.AddressesResponse": {
      /** @description Array of project Streams */
      result: components["schemas"]["Addresses"][];
      /** @description Cursor for fetching next page */
      cursor?: string;
      /**
       * Format: double
       * @description Total count of streams on the project
       */
      total: number;
    };
    /**
     * Format: uuid
     * @description Stringified UUIDv4.
     * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
     */
    "addressesTypes.UUID": string;
    "addressesTypes.AddressResponse": {
      /** @description The streamId */
      streamId: string;
      /** @description Address */
      address: Partial<string> & Partial<string[]>;
    };
    "addressesTypes.AddressesAdd": {
      /** @description The address or a list of addresses to be added to the Stream. */
      address: Partial<string> & Partial<string[]>;
    };
    "addressesTypes.DeleteAddressResponse": {
      /** @description The streamId */
      streamId: string;
      /** @description Address */
      address: string;
    };
    "addressesTypes.AddressesRemove": {
      /** @description The address to be removed from the Stream. */
      address: string;
    };
  };
  responses: {};
  parameters: {};
  requestBodies: {};
  headers: {};
}

export interface operations {
  GetHistory: {
    parameters: {
      query: {
        limit: number;
        cursor?: string;
        excludePayload?: boolean;
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["historyTypes.HistoryResponse"];
        };
      };
    };
  };
  /** Replay a specific history. */
  ReplayHistory: {
    parameters: {
      path: {
        /** The id of the history to replay */
        id: components["schemas"]["historyTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["historyTypes.HistoryModel"];
        };
      };
    };
  };
  /** Get the settings for the current project based on the project api-key. */
  GetSettings: {
    parameters: {};
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["settingsTypes.SettingsModel"];
        };
      };
    };
  };
  /** Set the settings for the current project based on the project api-key. */
  SetSettings: {
    parameters: {};
    responses: {
      /** No content */
      204: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["settingsTypes.SettingsModel"];
      };
    };
  };
  /** Get the stats for the current project based on the project api-key (Beta - This endpoint could be replaced or removed). */
  GetStats: {
    parameters: {};
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["statsTypes.StatsModel"];
        };
      };
    };
  };
  /** Get all the evm streams for the current project based on the project api-key. */
  GetStreams: {
    parameters: {
      query: {
        /** Limit response results max value 100 */
        limit: number;
        /** Cursor for fetching next page */
        cursor?: string;
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsResponse"];
        };
      };
    };
  };
  /** Creates a new evm stream. */
  CreateStream: {
    parameters: {};
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsModel"];
        };
      };
    };
    /** Provide a Stream Model */
    requestBody: {
      content: {
        "application/json": components["schemas"]["streamsTypes.StreamsModelCreate"];
      };
    };
  };
  /** Get a specific evm stream. */
  GetStream: {
    parameters: {
      path: {
        /** The id of the stream to get */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsModel"];
        };
      };
    };
  };
  /** Updates a specific evm stream. */
  UpdateStream: {
    parameters: {
      path: {
        /** The id of the stream to update */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsModel"];
        };
      };
    };
    /** Provide a Stream Model */
    requestBody: {
      content: {
        "application/json": components["schemas"]["Partial_streamsTypes.StreamsModelCreate_"];
      };
    };
  };
  /** Delete a specific evm stream. */
  DeleteStream: {
    parameters: {
      path: {
        /** The id of the stream to delete */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsModel"];
        };
      };
    };
  };
  /** Updates the status of specific evm stream. */
  UpdateStreamStatus: {
    parameters: {
      path: {
        /** The id of the stream to update */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["streamsTypes.StreamsModel"];
        };
      };
    };
    /** Provide a Stream Model */
    requestBody: {
      content: {
        "application/json": components["schemas"]["streamsTypes.StreamsStatusUpdate"];
      };
    };
  };
  /** Get all addresses associated with a specific stream. */
  GetAddresses: {
    parameters: {
      path: {
        /** the id of the stream to get the addresses from */
        id: components["schemas"]["addressesTypes.UUID"];
      };
      query: {
        /** Limit response results max value 100 */
        limit: number;
        /** Cursor for fetching next page */
        cursor?: string;
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["addressesTypes.AddressesResponse"];
        };
      };
    };
  };
  /** Adds an address to a Stream. */
  AddAddressToStream: {
    parameters: {
      path: {
        /** The id of the stream to add the address to */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["addressesTypes.AddressResponse"];
        };
      };
    };
    /** Provide a Address Model */
    requestBody: {
      content: {
        "application/json": components["schemas"]["addressesTypes.AddressesAdd"];
      };
    };
  };
  /** Deletes an address from a Stream. */
  DeleteAddressFromStream: {
    parameters: {
      path: {
        /** The id of the stream to delete the address from */
        id: components["schemas"]["streamsTypes.UUID"];
      };
    };
    responses: {
      /** Ok */
      200: {
        content: {
          "application/json": components["schemas"]["addressesTypes.DeleteAddressResponse"];
        };
      };
    };
    /** Provide a Address Model */
    requestBody: {
      content: {
        "application/json": components["schemas"]["addressesTypes.AddressesRemove"];
      };
    };
  };
}

export interface external {}
