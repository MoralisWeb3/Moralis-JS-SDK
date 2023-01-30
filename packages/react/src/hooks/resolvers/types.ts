import { BareFetcher, SWRConfiguration } from 'swr';
import { FetchConfig } from '../../context';

export type ResolverFetchParams<Response> = Pick<
  SWRConfiguration<Response, Error, BareFetcher<Response>>,
  keyof FetchConfig
>;
