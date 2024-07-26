import { EvmDecodedEventParamsItem, EvmDecodedEventParamsItemInput, EvmDecodedEventParamsItemJSON } from '../types/EvmDecodedEventParamsItem';

// $ref: #/components/schemas/decodedEvent
// type: decodedEvent
// properties:
// - signature ($ref: #/components/schemas/decodedEvent/properties/signature)
// - label ($ref: #/components/schemas/decodedEvent/properties/label)
// - type ($ref: #/components/schemas/decodedEvent/properties/type)
// - params ($ref: #/components/schemas/decodedEvent/properties/params/items)

export interface EvmDecodedEventJSON {
  readonly signature?: string;
  readonly label?: string;
  readonly type?: string;
  readonly params?: EvmDecodedEventParamsItemJSON[];
}

export interface EvmDecodedEventInput {
  readonly signature?: string;
  readonly label?: string;
  readonly type?: string;
  readonly params?: EvmDecodedEventParamsItemInput[] | EvmDecodedEventParamsItem[];
}

export class EvmDecodedEvent {
  public static create(input: EvmDecodedEventInput | EvmDecodedEvent): EvmDecodedEvent {
    if (input instanceof EvmDecodedEvent) {
      return input;
    }
    return new EvmDecodedEvent(input);
  }

  public static fromJSON(json: EvmDecodedEventJSON): EvmDecodedEvent {
    const input: EvmDecodedEventInput = {
      signature: json.signature,
      label: json.label,
      type: json.type,
      params: json.params ? json.params.map((item) => EvmDecodedEventParamsItem.fromJSON(item)) : undefined,
    };
    return EvmDecodedEvent.create(input);
  }

  public readonly signature?: string;
  public readonly label?: string;
  public readonly type?: string;
  public readonly params?: EvmDecodedEventParamsItem[];

  private constructor(input: EvmDecodedEventInput) {
    this.signature = input.signature;
    this.label = input.label;
    this.type = input.type;
    this.params = input.params ? input.params.map((item) => EvmDecodedEventParamsItem.create(item)) : undefined;
  }

  public toJSON(): EvmDecodedEventJSON {
    return {
      signature: this.signature,
      label: this.label,
      type: this.type,
      params: this.params ? this.params.map((item) => item.toJSON()) : undefined,
    }
  }
}
