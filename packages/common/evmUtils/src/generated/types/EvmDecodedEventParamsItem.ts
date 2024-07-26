// $ref: #/components/schemas/decodedEvent/properties/params/items
// type: decodedEvent_params_Item
// properties:
// - name ($ref: #/components/schemas/decodedEvent/properties/params/items/properties/name)
// - value ($ref: #/components/schemas/decodedEvent/properties/params/items/properties/value)
// - type ($ref: #/components/schemas/decodedEvent/properties/params/items/properties/type)

export interface EvmDecodedEventParamsItemJSON {
  readonly name?: string;
  readonly value?: string;
  readonly type?: string;
}

export interface EvmDecodedEventParamsItemInput {
  readonly name?: string;
  readonly value?: string;
  readonly type?: string;
}

export class EvmDecodedEventParamsItem {
  public static create(input: EvmDecodedEventParamsItemInput | EvmDecodedEventParamsItem): EvmDecodedEventParamsItem {
    if (input instanceof EvmDecodedEventParamsItem) {
      return input;
    }
    return new EvmDecodedEventParamsItem(input);
  }

  public static fromJSON(json: EvmDecodedEventParamsItemJSON): EvmDecodedEventParamsItem {
    const input: EvmDecodedEventParamsItemInput = {
      name: json.name,
      value: json.value,
      type: json.type,
    };
    return EvmDecodedEventParamsItem.create(input);
  }

  public readonly name?: string;
  public readonly value?: string;
  public readonly type?: string;

  private constructor(input: EvmDecodedEventParamsItemInput) {
    this.name = input.name;
    this.value = input.value;
    this.type = input.type;
  }

  public toJSON(): EvmDecodedEventParamsItemJSON {
    return {
      name: this.name,
      value: this.value,
      type: this.type,
    }
  }
}
