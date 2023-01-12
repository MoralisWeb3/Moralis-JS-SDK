/* eslint-disable @typescript-eslint/no-explicit-any */
import { Operation, toCamel } from '@moralisweb3/common-core';

// TODO: we need to remove this type and use `UnknownOperation` from `@moralisweb3/common-core`.
export type UnknownOperation = Operation<unknown, unknown, unknown, unknown>;

export function upgradeRequest(params: any, operation: UnknownOperation): any {
  const request = Object.keys(params).reduce<Record<string, any>>((value, key) => {
    value[toCamel(key)] = params[key];
    return value;
  }, {});

  if (request['address'] && !hasParam(operation, 'address')) {
    delete request['address'];
  }

  if (request['chain']) {
    if (!hasParam(operation, 'chain')) {
      delete request['chain'];
    } else {
      request['chain'] = upgradeChain(request['chain']);
    }
  }
  return request;
}

function hasParam(operation: UnknownOperation, name: string): boolean {
  return (
    (operation.bodyParamNames as string[] | undefined)?.includes(name) ||
    (operation.urlPathParamNames as string[] | undefined)?.includes(name) ||
    (operation.urlSearchParamNames as string[] | undefined)?.includes(name) ||
    false
  );
}

const chainMap: Record<string, string> = {
  eth: '0x1',
  goerli: '0x5',
  sepolia: '0xaa36a7',
  polygon: '0x89',
  mumbai: '0x13881',
  bsc: '0x38',
  'bsc testnet': '0x61',
  avalanche: '0xa86a',
  'avalanche testnet': '0xa869',
  fantom: '0xfa',
  cronos: '0x19',
  'cronos testnet': '0x152',
};

function upgradeChain(chain: string): string {
  const upgradedValue = chainMap[chain];
  return upgradedValue ?? chain;
}
