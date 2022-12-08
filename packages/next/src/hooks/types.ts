import { SWRConfiguration } from 'swr/dist/types';

export interface FetchParams extends Omit<SWRConfiguration, 'fetcher' | 'revalidateOnMount'> {
  /**
   * Enable or disable automatic data fetching when component is mounted.
   * Use `fetch` returned from the hook to trigger data fetch manually
   */
  revalidateOnMount?: boolean;
}
