import { AptosOperationV3ResolverFactory } from '@moralisweb3/aptos-api';
import { useMemo } from 'react';
import { useMoralisContext } from '../useMoralisContext';

export function useOperationV3Resolver() {
  const { core } = useMoralisContext();
  return useMemo(() => AptosOperationV3ResolverFactory.create(core), [core]);
}
