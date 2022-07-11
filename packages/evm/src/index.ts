import { MoralisEvm } from './MoralisEvm';

export * from './Contract';
export * from './MoralisEvm';

const defaultEvm = MoralisEvm.create();
export default defaultEvm;
