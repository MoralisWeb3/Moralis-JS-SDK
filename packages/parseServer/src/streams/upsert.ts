import { Document, Update } from '@moralisweb3/streams';
import Parse from 'parse/node';

export class Upsert {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private parseServer: any) {
    Parse.initialize(this.parseServer.config.appId);
    Parse.serverURL = this.parseServer.config.serverURL;
    Parse.masterKey = this.parseServer.config.masterKey;
  }

  async execute(path: string, filter: Record<string, unknown>, update: Update) {
    return this.upsert(update.collectionName + path, filter, update.document);
  }

  private async upsert(className: string, filter: Record<string, unknown>, update: Document) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await this.lazyUpsert(className, filter, update as any);
    await Parse.Object.saveAll(results, { useMasterKey: true });
  }

  private async lazyUpsert(className: string, filter: Record<string, unknown>, update: Record<string, unknown>) {
    delete update.id;
    const query = new Parse.Query(className);

    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        query.equalTo(key, filter[key]);
      }
    }

    const results = await query.find({ useMasterKey: true });

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        for (const updateKey in update) {
          if (Object.prototype.hasOwnProperty.call(update, updateKey)) {
            results[i].set(updateKey, update[updateKey]);
          }
        }
      }

      return results;
    }

    const objectClass = Parse.Object.extend(className);
    const object = new objectClass();
    // eslint-disable-next-line guard-for-in
    for (const updateKey in update) {
      object.set(updateKey, update[updateKey]);
    }

    return [object];
  }
}
