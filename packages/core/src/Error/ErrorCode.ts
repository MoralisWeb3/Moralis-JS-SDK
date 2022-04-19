export enum CoreErrorCode {
  // Generic Core error
  GENERIC_CORE_ERROR = 'C0001',
  // A module wants to register with a name that already is registered
  DUPLICATE_MODULE = 'C0002',
  // The module is not registered
  MODULE_NOT_FOUND = 'C0003',
  // Error in validation check
  VALIDATION_ERROR = 'C0004',
  INVALID_ARGUMENT = 'c0005',
  REQUEST_ERROR = 'c0006',
  NO_DATA_FOUND = 'c0007',
  NOT_INITIALIZED = 'c0008',
  ALREADY_INITIALIZED = 'c0009',
}

export enum ServerErrorCode {
  GENERIC_SERVER_ERROR = 'S0001',
  UNDEFINED_CONNECTOR = 'S0002',
  INVALID_SERVER_URL = 'S0003',
  INVALID_APPID = 'S0004',
  INVALID_PARSE_ENVIRONMENT = 'S0005',
  NOT_INITIALIZED = 'N0006',
  AUTHENTICATION_FAILED = 'N0007',
}

export enum NetworkErrorCode {
  GENERIC_NETWORK_ERROR = 'N0001',
  CANNOT_CONNECT = 'N0002',
  NO_PROVIDER = 'N0003',
  NO_ACCOUNT = 'N0004',
}

export enum NetworkConnectorErrorCode {
  GENERIC_NETWORK_CONNECTOR_ERROR = 'NC0001',
  NOT_IMPLEMENTED = 'NC0002',
  NO_PROVIDER = 'NC0003',
  MISSING_ARGUMENT = 'NC0004',
  INVALID_ARGUMENT = 'NC0005',
  INVALID_CONNECTOR = 'NC0006',
}

export enum ApiErrorCode {
  GENERIC_API_ERROR = 'A0001',
}

export enum UtilsErrorCode {
  GENERIC_Util_ERROR = 'U0001',
}

export type MoralisErrorCode =
  | CoreErrorCode
  | ServerErrorCode
  | NetworkErrorCode
  | NetworkConnectorErrorCode
  | ApiErrorCode
  | UtilsErrorCode;
