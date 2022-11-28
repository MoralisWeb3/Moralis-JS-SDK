import { SWRConfiguration } from 'swr/dist/types';

export interface FetchParams extends Omit<SWRConfiguration, 'fetcher'> {}
