import { ConfigValues } from '@moralisweb3/core';

export interface ICoreProviderProps extends Partial<ConfigValues> {
  children?: React.ReactNode;
  initializeOnMount?: boolean;
}
