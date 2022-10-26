import { CoreErrorCode, CoreError } from '../Error';

export const UnreachableError = new CoreError({
  code: CoreErrorCode.GENERIC_CORE_ERROR,
  message: `Incorrect type provided, code should not reach here`,
});

/**
 * Typesafe check, to make sure that code never reaches a certain point.
 * Can be used as an exhaustive check in swtich/if-else statements
 *
 * When used properly with Typescript, this code should never reach, as it is typed as 'never'
 *
 * If the code does reach this assertion an UnreachableError is thrown
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertUnreachable = (x: never): never => {
  throw UnreachableError;
};
