// $ref: #/components/schemas/metadataResync

export interface AptMetadataResyncJSON {
  readonly status: string;
}

export interface AptMetadataResyncInput {
  readonly status: string;
}

export class AptMetadataResync {
  public static create(input: AptMetadataResyncInput): AptMetadataResync {
    return new AptMetadataResync(input);
  }

  public static fromJSON(json: AptMetadataResyncJSON): AptMetadataResync {
    const input: AptMetadataResyncInput = {
      status: json.status,
    };
    return AptMetadataResync.create(input);
  }

  /**
   * @description The status of the resync request
   */
  public readonly status: string;

  private constructor(input: AptMetadataResyncInput) {
    this.status = input.status;
  }

  public toJSON(): AptMetadataResyncJSON {
    return {
      status: this.status,
    };
  }
}
