import { _useMoralisEvm } from '../../hooks/Evm/useMoralisEvm/_useMoralisEvm';
import { IMoralisProviderProps } from './types';
import { MoralisContext } from '../MoralisContext';
// import CoreProvider from '../../context/Core/CoreProvider/CoreProvider';
import Evm from '@moralisweb3/evm';
import CoreProvider from '../Core/CoreProvider/CoreProvider';

const MoralisProvider = ({ children, ...coreConfig }: IMoralisProviderProps) => {
  const moralisEVM = _useMoralisEvm();
  return (
    <CoreProvider {...coreConfig}>
      <MoralisContext.Provider
        value={{
          ...moralisEVM,
          Evm,
        }}
      >
        {children}
      </MoralisContext.Provider>
    </CoreProvider>
  );
};
export default MoralisProvider;
