import { components } from '../../operations/openapi';

export type EvmBlockDateInput = components['schemas']['blockDate'];

export interface EvmBlockDateData {
  date: Date;
  block: number;
  timestamp: number;
  blockTimestamp?: string;
  hash?: string;
  parentHash?: string;
}
