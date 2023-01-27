
// $ref: #/components/schemas/ipfsFile

export interface AptIpfsFileJSON {
  readonly path: string;
}

export interface AptIpfsFileInput {
  readonly path: string;
}

export class AptIpfsFile {
  public static create(input: AptIpfsFileInput): AptIpfsFile {
    return new AptIpfsFile(input);
  }

  public static fromJSON(json: AptIpfsFileJSON): AptIpfsFile {
    const input: AptIpfsFileInput = {
      path: json.path,
    };
    return AptIpfsFile.create(input);
  }

  /**
   * @description Path to the file
   */
  public readonly path: string;

  private constructor(input: AptIpfsFileInput) {
    this.path = input.path;
  }

  public toJSON(): AptIpfsFileJSON {
    return {
      path: this.path,
    }
  }
}
