import { AptLogEvent, AptLogEventJSON } from '../types/AptLogEvent';

// $ref: #/paths/~1{address}~1events/post/responses/200/content/application~1json/schema

export interface AptGetContractEventsJSON {
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
  readonly result?: AptLogEventJSON[];
}

export interface AptGetContractEventsInput {
  readonly total?: number;
  readonly page?: number;
  readonly pageSize?: number;
  readonly result?: AptLogEvent[];
}

export class AptGetContractEvents {
  public static create(input: AptGetContractEventsInput): AptGetContractEvents {
    return new AptGetContractEvents(input);
  }

  public static fromJSON(json: AptGetContractEventsJSON): AptGetContractEvents {
    const input: AptGetContractEventsInput = {
      total: json.total,
      page: json.page,
      pageSize: json.page_size,
      result: json.result ? json.result.map((item) => AptLogEvent.fromJSON(item)) : undefined,
    };
    return AptGetContractEvents.create(input);
  }

  /**
   * @description The total number of matches for this query
   */
  public readonly total?: number;
  /**
   * @description The current page of the result
   */
  public readonly page?: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize?: number;
  public readonly result?: AptLogEvent[];

  private constructor(input: AptGetContractEventsInput) {
    this.total = input.total;
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.result = input.result;
  }

  public toJSON(): AptGetContractEventsJSON {
    return {
      total: this.total,
      page: this.page,
      page_size: this.pageSize,
      result: this.result ? this.result.map((item) => item.toJSON()) : undefined,
    }
  }
}
