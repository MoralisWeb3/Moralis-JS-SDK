export enum CoreErrorCode {
  // Generic Core error
  GENERIC_CORE_ERROR = 'C0001',
  // A module wants to register with a name that already is registered
  DUPLICATE_MODULE = 'C0002',
  // The module is not registered
  MODULE_NOT_FOUND = 'C0003',
  // Error in validation check
  VALIDATION_ERROR = 'C0004',
  INVALID_ARGUMENT = 'C0005',
  REQUEST_ERROR = 'C0006',
  NO_DATA_FOUND = 'C0007',
  NOT_INITIALIZED = 'C0008',
  ALREADY_INITIALIZED = 'C0009',
  METHOD_FAILED = 'C0010',
  STATE_MACHINE_STARTED = 'C0011',
  STATE_MACHINE_NOT_STARTED = 'C0012',
  CONFIG_KEY_NOT_EXIST = 'C0013',
  CONFIG_INVALID_VALUE = 'C0014',
  CONFIG_KEY_ALREADY_EXIST = 'C0015',

  NOT_IMPLEMENTED = 'C9000',
}

export enum ApiErrorCode {
  GENERIC_API_ERROR = 'A0001',
  PAGE_LIMIT_EXCEEDED = 'A0002',
  API_KEY_NOT_SET = 'A0003',

  NOT_IMPLEMENTED = 'A9000',
}

export enum AuthErrorCode {
  GENERIC_AUTH_ERROR = 'U0001',
  INCORRECT_NETWORK = 'U0002',
  INCORRECT_PARAMETER = 'U0003',

  NOT_IMPLEMENTED = 'U9000',
}

export type MoralisErrorCode = CoreErrorCode | ApiErrorCode | AuthErrorCode;
