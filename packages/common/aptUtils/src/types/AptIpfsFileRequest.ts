// $ref: #/components/schemas/ipfsFileRequest

export interface AptIpfsFileRequestJSON {
  readonly path: string;
  readonly content: string;
}

export interface AptIpfsFileRequestInput {
  readonly path: string;
  readonly content: string;
}

export class AptIpfsFileRequest {
  public static create(input: AptIpfsFileRequestInput): AptIpfsFileRequest {
    return new AptIpfsFileRequest(input);
  }

  public static fromJSON(json: AptIpfsFileRequestJSON): AptIpfsFileRequest {
    const input: AptIpfsFileRequestInput = {
      path: json.path,
      content: json.content,
    };
    return AptIpfsFileRequest.create(input);
  }

  /**
   * @description Path to the file
   */
  public readonly path: string;
  /**
   * @description Base64 or JSON
   */
  public readonly content: string;

  private constructor(input: AptIpfsFileRequestInput) {
    this.path = input.path;
    this.content = input.content;
  }

  public toJSON(): AptIpfsFileRequestJSON {
    return {
      path: this.path,
      content: this.content,
    };
  }
}
