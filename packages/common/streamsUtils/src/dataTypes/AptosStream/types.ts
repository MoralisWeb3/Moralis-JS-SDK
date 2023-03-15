import { AptosNetwork, AptosNetworkInput } from '@moralisweb3/common-aptos-utils';

export type StreamStatus = 'active' | 'paused' | 'error' | 'terminated';

export interface AptosStreamInput {
  id: string;
  allAddresses: boolean;
  demo: boolean;
  description: string;
  includeChanges: boolean;
  includeEvents: boolean;
  includePayload: boolean;
  isErrorSince: string | null;
  network: AptosNetworkInput[];
  status: StreamStatus;
  statusMessage: string;
  events: string[];
  functions: string[];
  tag: string;
  webhookUrl: string;
  amountOfAddresses: number;
}

export interface AptosStreamData {
  id: string;
  allAddresses: boolean;
  demo: boolean;
  description: string;
  includeChanges: boolean;
  includeEvents: boolean;
  includePayload: boolean;
  isErrorSince: string | null;
  network: AptosNetwork[];
  status: StreamStatus;
  statusMessage: string;
  events: string[];
  functions: string[];
  tag: string;
  webhookUrl: string;
  amountOfAddresses: number;
}

export type AptosStreamJSON = {
  id: string;
  allAddresses: boolean;
  demo: boolean;
  description: string;
  includeChanges: boolean;
  includeEvents: boolean;
  includePayload: boolean;
  isErrorSince: string | null;
  network: string[];
  status: StreamStatus;
  statusMessage: string;
  events: string[];
  functions: string[];
  tag: string;
  webhookUrl: string;
  amountOfAddresses: number;
};
