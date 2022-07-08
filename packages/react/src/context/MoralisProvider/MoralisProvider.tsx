import { MoralisContext } from '../MoralisContext';
import { IMoralisProviderProps } from './types';

const MoralisProvider = ({
  children,
  appId,
  serverUrl,
}: //
//
//   jsKey,
//   dangerouslyUseOfMasterKey,
//   plugins,
//   environment,
//   getMoralis,
//   options: { onAccountChanged } = {},
//   initializeOnMount = true,
IMoralisProviderProps) => {
  return (
    <MoralisContext.Provider
      value={{
        appId,
        serverUrl,
      }}
    >
      {children}
    </MoralisContext.Provider>
  );
};
export default MoralisProvider;
