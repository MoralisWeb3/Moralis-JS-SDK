import { StreamTriggerResultInput } from './types';

const balanceTrigger: StreamTriggerResultInput = {
  name: 'fromBalance',
  value: '200000000000000000',
};

export const mockStreamTriggerResult = {
  BALANCE_TRIGGER: balanceTrigger,
};
