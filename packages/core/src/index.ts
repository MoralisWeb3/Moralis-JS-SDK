import { MoralisCore } from './MoralisCore';
import { MoralisCoreProvider } from './MoralisCoreProvider';

export * from './MoralisCore';
export * from './MoralisCoreProvider';
export * from './Modules';
export * from './Error';
export * from './config';
export * from './Assert';
export * from './State';
export * from './sharedTypes/index';
export * from './dataTypes';
export * from './controllers';
export * from './utils';

const defaultCore = MoralisCore.create();
MoralisCoreProvider.setDefault(defaultCore);
export default defaultCore;
