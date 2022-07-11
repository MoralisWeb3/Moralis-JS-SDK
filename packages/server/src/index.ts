import { MoralisServer } from './MoralisServer';

export * from './AuthMethods/types';
export * from './MoralisServer';

const defaultServer = MoralisServer.create();
export default defaultServer;
