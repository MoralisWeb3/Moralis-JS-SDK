// $ref: #/components/schemas/logEvent/properties/data

export interface AptLogEventDataJSON {
  readonly from?: string;
  readonly to?: string;
  readonly value?: string;
}

export interface AptLogEventDataInput {
  readonly from?: string;
  readonly to?: string;
  readonly value?: string;
}

export class AptLogEventData {
  public static create(input: AptLogEventDataInput): AptLogEventData {
    return new AptLogEventData(input);
  }

  public static fromJSON(json: AptLogEventDataJSON): AptLogEventData {
    const input: AptLogEventDataInput = {
      from: json.from,
      to: json.to,
      value: json.value,
    };
    return AptLogEventData.create(input);
  }

  public readonly from?: string;
  public readonly to?: string;
  public readonly value?: string;

  private constructor(input: AptLogEventDataInput) {
    this.from = input.from;
    this.to = input.to;
    this.value = input.value;
  }

  public toJSON(): AptLogEventDataJSON {
    return {
      from: this.from,
      to: this.to,
      value: this.value,
    };
  }
}
