import { MoralisEvmApi } from './EvmApi';

export * from './EvmApi';

const defaultEvmApi = MoralisEvmApi.create();
export default defaultEvmApi;
