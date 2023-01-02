import { Block, IWebhook } from '@moralisweb3/streams-typings';
import { Document, Update } from '../storage';
import { CollectionNameBuilder } from './CollectionNameBuilder';

export class SimpleProcessor<Doc extends Document, Item> {
  public constructor(
    private readonly collectionNameBuilder: CollectionNameBuilder,
    private readonly documentBuilder: (item: Item, block: Block, confirmed: boolean, chainId: string) => Doc,
  ) {}

  public process(items: Item[], batch: IWebhook): Update<Doc>[] {
    const updates: Update<Doc>[] = [];

    if (items) {
      for (const item of items) {
        const document = this.documentBuilder(item, batch.block, batch.confirmed, batch.chainId);

        updates.push({
          collectionName: this.collectionNameBuilder.build(batch.tag),
          document,
        });
      }
    }

    return updates;
  }
}
