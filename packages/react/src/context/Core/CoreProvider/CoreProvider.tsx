import { ICoreProviderProps } from './types';
import Core from '@moralisweb3/core';
import { _useMoralisCore } from '../../../hooks/Core/useMoralisCore/_useMoralisCore';
import { CoreContext } from '../CoreContext';

const CoreProvider = ({ children, ...coreConfig }: ICoreProviderProps) => {
  const moralisCore = _useMoralisCore(coreConfig);
  return (
    <CoreContext.Provider
      value={{
        ...coreConfig,
        ...moralisCore,
        Core,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
};
export default CoreProvider;
