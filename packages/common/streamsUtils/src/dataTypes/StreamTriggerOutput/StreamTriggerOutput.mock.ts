import { StreamTriggerOutputInput } from './types';

const balanceTrigger: StreamTriggerOutputInput = {
  name: 'fromBalance',
  value: '200000000000000000',
};

const totalSupplyTrigger: StreamTriggerOutputInput = {
  name: 'totalSupply',
  value: '100000000000000000000000000000000000',
};

export const mockStreamTriggerOutput = {
  BALANCE_TRIGGER: balanceTrigger,
  TOTAL_SUPPLY_TRIGGER: totalSupplyTrigger,
};
