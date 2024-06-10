import { EvmErc20TokenOwner, EvmErc20TokenOwnerInput, EvmErc20TokenOwnerJSON } from '../types/EvmErc20TokenOwner';

// $ref: #/components/schemas/erc20TokenOwnerCollection
// type: erc20TokenOwnerCollection
// properties:
// - page ($ref: #/components/schemas/erc20TokenOwnerCollection/properties/page)
// - page_size ($ref: #/components/schemas/erc20TokenOwnerCollection/properties/page_size)
// - cursor ($ref: #/components/schemas/erc20TokenOwnerCollection/properties/cursor)
// - result ($ref: #/components/schemas/erc20TokenOwner)

export interface EvmErc20TokenOwnerCollectionJSON {
  readonly page?: number;
  readonly page_size?: number;
  readonly cursor?: string;
  readonly result: EvmErc20TokenOwnerJSON[];
}

export interface EvmErc20TokenOwnerCollectionInput {
  readonly page?: number;
  readonly pageSize?: number;
  readonly cursor?: string;
  readonly result: EvmErc20TokenOwnerInput[] | EvmErc20TokenOwner[];
}

export class EvmErc20TokenOwnerCollection {
  public static create(input: EvmErc20TokenOwnerCollectionInput | EvmErc20TokenOwnerCollection): EvmErc20TokenOwnerCollection {
    if (input instanceof EvmErc20TokenOwnerCollection) {
      return input;
    }
    return new EvmErc20TokenOwnerCollection(input);
  }

  public static fromJSON(json: EvmErc20TokenOwnerCollectionJSON): EvmErc20TokenOwnerCollection {
    const input: EvmErc20TokenOwnerCollectionInput = {
      page: json.page,
      pageSize: json.page_size,
      cursor: json.cursor,
      result: json.result.map((item) => EvmErc20TokenOwner.fromJSON(item)),
    };
    return EvmErc20TokenOwnerCollection.create(input);
  }

  /**
   * @description The current page of the result
   */
  public readonly page?: number;
  /**
   * @description The number of results per page
   */
  public readonly pageSize?: number;
  /**
   * @description The cursor to get to the next page
   */
  public readonly cursor?: string;
  public readonly result: EvmErc20TokenOwner[];

  private constructor(input: EvmErc20TokenOwnerCollectionInput) {
    this.page = input.page;
    this.pageSize = input.pageSize;
    this.cursor = input.cursor;
    this.result = input.result.map((item) => EvmErc20TokenOwner.create(item));
  }

  public toJSON(): EvmErc20TokenOwnerCollectionJSON {
    return {
      page: this.page,
      page_size: this.pageSize,
      cursor: this.cursor,
      result: this.result.map((item) => item.toJSON()),
    }
  }
}
