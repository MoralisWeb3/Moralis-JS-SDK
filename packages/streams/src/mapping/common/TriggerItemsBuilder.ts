import { TriggerOutput } from '@moralisweb3/streams-typings';
import { TriggerItem, TriggerItemValue } from '../storage';

export class TriggerItemsBuilder {
  public static build(triggers: TriggerOutput[] | undefined): TriggerItem[] | undefined {
    if (!triggers || triggers.length === 0) {
      return undefined;
    }

    return triggers.map((trigger) => ({
      name: String(trigger.name),
      value: convertValue(trigger.value),
    }));
  }
}

function convertValue(value: any): TriggerItemValue {
  const type = typeof value;
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(convertValue);
  }
  return String(value);
}
