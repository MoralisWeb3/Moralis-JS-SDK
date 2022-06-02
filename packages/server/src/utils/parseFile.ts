import { File, FullOptions } from 'parse';

interface FileOptions extends FullOptions {
  ipfs: boolean;
  metadata?: object;
  tags?: object;
}

export class ParseFile extends File {
  saveIPFS(options?: FileOptions) {
    if (!options) {
      options = {
        ipfs: true,
      };
    } else {
      options.ipfs = true;
    }
    return this.save(options);
  }
}
