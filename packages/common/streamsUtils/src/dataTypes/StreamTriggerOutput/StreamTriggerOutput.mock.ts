import { StreamTriggerOutputInput } from './types';

const balanceTrigger: StreamTriggerOutputInput = {
  name: 'fromBalance',
  value: '200000000000000000',
};

export const mockStreamTriggerOutput = {
  BALANCE_TRIGGER: balanceTrigger,
};
